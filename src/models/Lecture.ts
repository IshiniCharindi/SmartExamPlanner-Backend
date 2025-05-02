export interface Lecturer{
    lecturerId?: number;
    name: string;
    departmentId: number;
    rank: string;
    facultyId: number;
    availability: Record<string, boolean>;
    email: string;
    phone: string;
}
