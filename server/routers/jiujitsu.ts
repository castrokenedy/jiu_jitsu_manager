import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const jiujitsuRouter = router({
  // ===== PUBLIC PROCEDURES =====
  
  // Get general ranking (public)
  getGeneralRanking: publicProcedure.query(async () => {
    const ranking = await db.getGeneralRanking();
    return ranking.map((item: any) => ({
      id: item.id,
      name: item.name,
      belt: item.belt,
      totalPoints: item.totalPoints || 0,
    }));
  }),

  // Get active announcements (public)
  getAnnouncements: publicProcedure.query(async () => {
    return db.getActiveAnnouncements();
  }),

  // Get all students (public - for dashboard)
  getAllStudents: publicProcedure.query(async () => {
    return db.getAllStudents();
  }),

  // Get upcoming competitions (public)
  getUpcomingCompetitions: publicProcedure.query(async () => {
    const competitions = await db.getAllCompetitions();
    const today = new Date();
    return competitions
      .filter((c: any) => new Date(c.date) >= today)
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }),

  // Get devotionals schedule (public)
  getDevotionalsSchedule: publicProcedure.query(async () => {
    const schedule = [];
    for (let day = 0; day < 7; day++) {
      const devotionals = await db.getDevotionalsByDayOfWeek(day);
      schedule.push({
        day,
        dayName: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][day],
        devotionals,
      });
    }
    return schedule;
  }),

  // Get student attendance rate for month
  getStudentAttendanceRate: publicProcedure
    .input(z.object({
      studentId: z.number(),
      year: z.number(),
      month: z.number(),
    }))
    .query(async ({ input }) => {
      const attendance = await db.getStudentAttendanceByMonth(input.studentId, input.year, input.month);
      const presentDays = attendance.filter((a: any) => a.present).length;
      const totalDays = attendance.length;
      const rate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
      return { presentDays, totalDays, rate };
    }),

  // ===== ADMIN PROCEDURES =====

  // Create student
  createStudent: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      belt: z.enum(["branca", "azul", "roxa", "marrom", "preta"]),
      phone: z.string().optional(),
      entryDate: z.date(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const entryDateStr = input.entryDate.toISOString().split('T')[0];
      return db.createStudent({
        name: input.name,
        belt: input.belt,
        phone: input.phone || null,
        entryDate: entryDateStr,
        notes: input.notes || null,
      });
    }),

  // Update student
  updateStudent: adminProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      belt: z.enum(["branca", "azul", "roxa", "marrom", "preta"]).optional(),
      phone: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.updateStudent(id, data);
    }),

  // Record attendance
  recordAttendance: adminProcedure
    .input(z.object({
      studentId: z.number(),
      date: z.date(),
      present: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      await db.recordAttendance(input.studentId, input.date, input.present);
      
      // Award points if present
      if (input.present) {
        await db.recordPointLog(input.studentId, "presenca", 1, "Presença registrada");
      }
      
      return { success: true };
    }),

  // Record points (generic)
  recordPoints: adminProcedure
    .input(z.object({
      studentId: z.number(),
      pointType: z.enum(["presenca", "devocional", "campeonato", "visitante", "vitoria"]),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const pointValues: Record<string, number> = {
        presenca: 1,
        devocional: 3,
        campeonato: 5,
        visitante: 2,
        vitoria: 10,
      };

      const value = pointValues[input.pointType];
      await db.recordPointLog(input.studentId, input.pointType, value, input.description);
      
      return { success: true, pointsAwarded: value };
    }),

  // Schedule devotional
  scheduleDevotional: adminProcedure
    .input(z.object({
      studentId: z.number(),
      dayOfWeek: z.number().min(0).max(6),
      scheduledDate: z.date().optional(),
    }))
    .mutation(async ({ input }) => {
      return db.scheduleDevotional(input.studentId, input.dayOfWeek, input.scheduledDate);
    }),

  // Create competition
  createCompetition: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      date: z.date(),
      location: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const dateStr = input.date.toISOString().split('T')[0];
      return db.createCompetition({
        name: input.name,
        date: dateStr,
        location: input.location || null,
        description: input.description || null,
      });
    }),

  // Enroll student in competition
  enrollStudentInCompetition: adminProcedure
    .input(z.object({
      studentId: z.number(),
      competitionId: z.number(),
    }))
    .mutation(async ({ input }) => {
      await db.enrollStudentInCompetition(input.studentId, input.competitionId);
      // Award competition points
      await db.recordPointLog(input.studentId, "campeonato", 5, "Participação em competição");
      return { success: true };
    }),

  // Create announcement
  createAnnouncement: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      return db.createAnnouncement({
        title: input.title,
        content: input.content,
        active: true,
      });
    }),

  // Update announcement
  updateAnnouncement: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      content: z.string().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.updateAnnouncement(id, data);
    }),

  // Get student point history
  getStudentPointHistory: adminProcedure
    .input(z.object({ studentId: z.number() }))
    .query(async ({ input }) => {
      return db.getStudentPointHistory(input.studentId);
    }),

  // Get student devotional history
  getStudentDevotionalHistory: adminProcedure
    .input(z.object({ studentId: z.number() }))
    .query(async ({ input }) => {
      return db.getDevotionalHistory(input.studentId);
    }),

  // Get all competitions (admin)
  getAllCompetitions: adminProcedure.query(async () => {
    return db.getAllCompetitions();
  }),
});
