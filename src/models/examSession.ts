export interface ExamSession {
    sessionId?: number;
    examDate: string;
    startTime: string;
    endTime: string;
    subjectCode?: string;
    degreeId: number; // Changed from string to number to match database schema
    studentCount: number;
}