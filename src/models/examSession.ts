export interface ExamSession {
    sessionId?: number;
    examDate: string;         // Format: 'YYYY-MM-DD'
    startTime: string;        // Format: 'HH:MM:SS'
    endTime: string;          // Format: 'HH:MM:SS'
    subjectCode?: string;
    studentCount: number;
}