import { describe, it, expect, beforeEach, vi } from "vitest";
import { jiujitsuRouter } from "./jiujitsu";
import * as db from "../db";

// Mock database functions
vi.mock("../db", () => ({
  getGeneralRanking: vi.fn(),
  getActiveAnnouncements: vi.fn(),
  getAllStudents: vi.fn(),
  getAllCompetitions: vi.fn(),
  getDevotionalsByDayOfWeek: vi.fn(),
  recordAttendance: vi.fn(),
  recordPointLog: vi.fn(),
  createStudent: vi.fn(),
  updateStudent: vi.fn(),
  scheduleDevotional: vi.fn(),
  createCompetition: vi.fn(),
  enrollStudentInCompetition: vi.fn(),
  createAnnouncement: vi.fn(),
  updateAnnouncement: vi.fn(),
  getStudentPointHistory: vi.fn(),
  getDevotionalHistory: vi.fn(),
}));

describe("jiujitsuRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Public Procedures", () => {
    it("getGeneralRanking returns ranking with points", async () => {
      const mockRanking = [
        { id: 1, name: "João", belt: "preta", totalPoints: 50 },
        { id: 2, name: "Maria", belt: "roxa", totalPoints: 35 },
      ];
      vi.mocked(db.getGeneralRanking).mockResolvedValue(mockRanking as any);

      const caller = jiujitsuRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getGeneralRanking();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        name: "João",
        belt: "preta",
        totalPoints: 50,
      });
    });

    it("getAnnouncements returns active announcements", async () => {
      const mockAnnouncements = [
        { id: 1, title: "Aviso", content: "Teste", active: true },
      ];
      vi.mocked(db.getActiveAnnouncements).mockResolvedValue(
        mockAnnouncements as any
      );

      const caller = jiujitsuRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getAnnouncements();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Aviso");
    });

    it("getAllStudents returns list of active students", async () => {
      const mockStudents = [
        {
          id: 1,
          name: "João",
          belt: "preta",
          phone: "11999999999",
          entryDate: "2024-01-01",
          active: true,
        },
      ];
      vi.mocked(db.getAllStudents).mockResolvedValue(mockStudents as any);

      const caller = jiujitsuRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getAllStudents();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("João");
    });
  });

  describe("Admin Procedures", () => {
    const adminUser = {
      id: 1,
      openId: "admin-user",
      name: "Professor",
      email: "prof@example.com",
      role: "admin" as const,
      loginMethod: "manus",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };

    it("createStudent creates a new student", async () => {
      vi.mocked(db.createStudent).mockResolvedValue({ insertId: 1 } as any);

      const caller = jiujitsuRouter.createCaller({
        user: adminUser,
        req: {} as any,
        res: {} as any,
      });

      await caller.createStudent({
        name: "João Silva",
        belt: "azul",
        phone: "11999999999",
        entryDate: new Date("2024-01-01"),
        notes: "Novo aluno",
      });

      expect(db.createStudent).toHaveBeenCalled();
    });

    it("recordAttendance records presence and awards points", async () => {
      vi.mocked(db.recordAttendance).mockResolvedValue(undefined);
      vi.mocked(db.recordPointLog).mockResolvedValue(undefined);

      const caller = jiujitsuRouter.createCaller({
        user: adminUser,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.recordAttendance({
        studentId: 1,
        date: new Date(),
        present: true,
      });

      expect(result.success).toBe(true);
      expect(db.recordAttendance).toHaveBeenCalled();
      expect(db.recordPointLog).toHaveBeenCalledWith(1, "presenca", 1, expect.any(String));
    });

    it("recordPoints awards correct points based on type", async () => {
      vi.mocked(db.recordPointLog).mockResolvedValue(undefined);

      const caller = jiujitsuRouter.createCaller({
        user: adminUser,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.recordPoints({
        studentId: 1,
        pointType: "vitoria",
      });

      expect(result.pointsAwarded).toBe(10);
      expect(db.recordPointLog).toHaveBeenCalledWith(1, "vitoria", 10, undefined);
    });

    it("scheduleDevotional schedules a devotional", async () => {
      vi.mocked(db.scheduleDevotional).mockResolvedValue(undefined);

      const caller = jiujitsuRouter.createCaller({
        user: adminUser,
        req: {} as any,
        res: {} as any,
      });

      await caller.scheduleDevotional({
        studentId: 1,
        dayOfWeek: 3,
      });

      expect(db.scheduleDevotional).toHaveBeenCalled();
    });

    it("createCompetition creates a new competition", async () => {
      vi.mocked(db.createCompetition).mockResolvedValue(undefined);

      const caller = jiujitsuRouter.createCaller({
        user: adminUser,
        req: {} as any,
        res: {} as any,
      });

      await caller.createCompetition({
        name: "Campeonato Regional",
        date: new Date("2026-06-15"),
        location: "São Paulo",
      });

      expect(db.createCompetition).toHaveBeenCalled();
    });

    it("enrollStudentInCompetition enrolls and awards points", async () => {
      vi.mocked(db.enrollStudentInCompetition).mockResolvedValue(undefined);
      vi.mocked(db.recordPointLog).mockResolvedValue(undefined);

      const caller = jiujitsuRouter.createCaller({
        user: adminUser,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.enrollStudentInCompetition({
        studentId: 1,
        competitionId: 1,
      });

      expect(result.success).toBe(true);
      expect(db.enrollStudentInCompetition).toHaveBeenCalled();
      expect(db.recordPointLog).toHaveBeenCalledWith(
        1,
        "campeonato",
        5,
        expect.any(String)
      );
    });

    it("createAnnouncement creates a new announcement", async () => {
      vi.mocked(db.createAnnouncement).mockResolvedValue(undefined);

      const caller = jiujitsuRouter.createCaller({
        user: adminUser,
        req: {} as any,
        res: {} as any,
      });

      await caller.createAnnouncement({
        title: "Aviso Importante",
        content: "Aula cancelada amanhã",
      });

      expect(db.createAnnouncement).toHaveBeenCalled();
    });
  });
});
