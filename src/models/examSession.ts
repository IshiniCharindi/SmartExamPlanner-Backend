export interface ExamSession {
    sessionId?: number;
    examDate: string;
    startTime: string;
    endTime: string;
    subjectCode?: string;
    departmentId: number; // Changed from string to number to match database schema
    studentCount: number;
}