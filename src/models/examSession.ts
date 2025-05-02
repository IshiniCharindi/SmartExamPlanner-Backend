export interface ExamSession {
    sessionId?: number;
    examDate: string;
    startTime: string;
    endTime: string;
    subjectCode?: string;
    degree?:string,
    studentCount: number;
}