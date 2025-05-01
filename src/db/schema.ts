import {mysqlTable, varchar, boolean, decimal, datetime, char, int, mysqlEnum} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { json } from "drizzle-orm/mysql-core";
import { text } from "drizzle-orm/mysql-core";
import { date, time } from "drizzle-orm/mysql-core";


export const users = mysqlTable("users", {
    userId: int("user_id").primaryKey().autoincrement(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password_hash", { length: 255 }).notNull(),
    role: mysqlEnum("role", ['Admin', 'Editor', 'Viewer', 'Coordinator']).notNull(),
    email: varchar("email", { length: 100 }),
    phone: varchar("phone", { length: 20 }),
});

export const lecturers = mysqlTable("lecturers", {
    lecturerId: int("lecturer_id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    designation: varchar("designation", { length: 100 }),
    department: varchar("department", { length: 50 }),
    rank: varchar("rank", { length: 50 }),
    faculty: varchar("faculty", { length: 50 }),
    availability: json("availability"),
    email: varchar("email", { length: 100 }),
    phone: varchar("phone", { length: 20 }),
});

export const examHalls = mysqlTable("exam_halls", {
    hallId: int("hall_id").primaryKey().autoincrement(),
    hallName: varchar("hall_name", { length: 100 }).notNull(),
    maxCapacity: int("max_capacity").notNull(),
    location: varchar("location", { length: 100 }),
});

export const subjects = mysqlTable("subjects", {
    subjectCode: varchar("subject_code", { length: 10 }).primaryKey(),
    subjectName: varchar("subject_name", { length: 100 }).notNull(),
    degreeProgram: varchar("degree_program", { length: 50 }),
    yearOfStudy: int("year_of_study"),
    paperSetters: text("paper_setters"),
});

export const examSessions = mysqlTable("exam_sessions", {
    sessionId: int("session_id").primaryKey().autoincrement(),
    examDate: date("exam_date").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    subjectCode: varchar("subject_code", { length: 10 }),
    studentCount: int("student_count").notNull(),
});
export const hallAllocations = mysqlTable("hall_allocations", {
    allocationId: int("allocation_id").primaryKey().autoincrement(),
    sessionId: int("session_id"),
    hallId: int("hall_id"),
    allocatedCapacity: int("allocated_capacity"),
});
export const staffAssignments = mysqlTable("staff_assignments", {
    assignmentId: int("assignment_id").primaryKey().autoincrement(),
    sessionId: int("session_id"),
    lecturerId: int("lecturer_id"),
    role: mysqlEnum("role", ['Supervisor', 'Invigilator', 'Hall Attendant']),
    manualOverride: int("manual_override").default(0), // BOOLEAN mapped to INT in MySQL
});

export const auditLogs = mysqlTable("audit_logs", {
    logId: int("log_id").primaryKey().autoincrement(),
    userId: int("user_id"),
    action: varchar("action", { length: 255 }),
    timestamp: datetime("timestamp").default(sql`CURRENT_TIMESTAMP`),
    details: text("details"),
});

export const notifications = mysqlTable("notifications", {
    notificationId: int("notification_id").primaryKey().autoincrement(),
    lecturerId: int("lecturer_id"),
    message: text("message"),
    sentAt: datetime("sent_at").default(sql`CURRENT_TIMESTAMP`),
    via: mysqlEnum("via", ['Email', 'SMS']),
});


