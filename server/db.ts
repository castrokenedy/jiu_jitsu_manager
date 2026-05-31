import { eq, desc, and, gte, sql, sum } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, students, attendance, devotionals, competitions, competitionEnrollments, medals, pointLogs, announcements } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== STUDENTS QUERIES =====
export async function getAllStudents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(students).where(eq(students.active, true)).orderBy(students.name);
}

export async function getStudentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(students).where(eq(students.id, id)).limit(1);
  return result[0];
}

export async function createStudent(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(students).values(data);
  return result;
}

export async function updateStudent(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(students).set(data).where(eq(students.id, id));
}

// ===== ATTENDANCE QUERIES =====
export async function getAttendanceByDate(date: Date) {
  const db = await getDb();
  if (!db) return [];
  const dateStr = date.toISOString().split('T')[0];
  return db.select().from(attendance).where(eq(attendance.attendanceDate, dateStr as any));
}

export async function getStudentAttendanceByMonth(studentId: number, year: number, month: number) {
  const db = await getDb();
  if (!db) return [];
  const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month, 0).toISOString().split('T')[0];
  return db.select().from(attendance).where(
    and(
      eq(attendance.studentId, studentId),
      gte(attendance.attendanceDate, startDate as any),
      gte(endDate as any, attendance.attendanceDate)
    )
  );
}

export async function recordAttendance(studentId: number, date: Date, present: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const dateStr = date.toISOString().split('T')[0];
  return db.insert(attendance).values({ studentId, attendanceDate: dateStr as any, present });
}

// ===== POINT LOGS QUERIES =====
export async function getStudentTotalPoints(studentId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ total: sum(pointLogs.value) }).from(pointLogs).where(eq(pointLogs.studentId, studentId));
  return result[0]?.total || 0;
}

export async function recordPointLog(studentId: number, pointType: string, value: number, description?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(pointLogs).values({ studentId, pointType: pointType as any, value, description });
}

export async function getStudentPointHistory(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pointLogs).where(eq(pointLogs.studentId, studentId)).orderBy(desc(pointLogs.createdAt));
}

// ===== RANKING QUERIES =====
export async function getGeneralRanking() {
  const db = await getDb();
  if (!db) return [];
  
  const studentsData = await db.select({
    id: students.id,
    name: students.name,
    belt: students.belt,
    totalPoints: sum(pointLogs.value),
  })
  .from(students)
  .leftJoin(pointLogs, eq(students.id, pointLogs.studentId))
  .where(eq(students.active, true))
  .groupBy(students.id)
  .orderBy(desc(sum(pointLogs.value)));
  
  return studentsData;
}

// ===== DEVOTIONALS QUERIES =====
export async function getDevotionalsByDayOfWeek(dayOfWeek: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(devotionals).where(eq(devotionals.dayOfWeek, dayOfWeek));
}

export async function scheduleDevotional(studentId: number, dayOfWeek: number, scheduledDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const dateStr = scheduledDate ? scheduledDate.toISOString().split('T')[0] : null;
  return db.insert(devotionals).values({ studentId, dayOfWeek, scheduledDate: dateStr as any });
}

export async function getDevotionalHistory(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(devotionals).where(eq(devotionals.studentId, studentId)).orderBy(desc(devotionals.createdAt));
}

// ===== COMPETITIONS QUERIES =====
export async function getAllCompetitions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(competitions).orderBy(desc(competitions.date));
}

export async function createCompetition(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(competitions).values(data);
}

export async function enrollStudentInCompetition(studentId: number, competitionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(competitionEnrollments).values({ studentId, competitionId });
}

export async function getCompetitionEnrollments(competitionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(competitionEnrollments).where(eq(competitionEnrollments.competitionId, competitionId));
}

// ===== ANNOUNCEMENTS QUERIES =====
export async function getActiveAnnouncements() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(announcements).where(eq(announcements.active, true)).orderBy(desc(announcements.createdAt));
}

export async function createAnnouncement(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(announcements).values(data);
}

export async function updateAnnouncement(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(announcements).set(data).where(eq(announcements.id, id));
}
