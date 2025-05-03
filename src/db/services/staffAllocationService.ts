import { Staff, StaffRank, ExamSession } from "../models/staff";
import { ExamHall } from "../models/examHall";
import { ExamSessionService } from "./examSessionService";

// Helper function to check if a lecturer is available
const isLecturerAvailable = (lecturer: Staff): boolean => {
    return lecturer.status === 'available';
};

// Helper function to assign supervisor from the eligible staff list
const assignSupervisor = (session: ExamSession, staffList: Staff[], setters: string[]): Staff | null => {
    const eligibleStaff = staffList.filter(staff =>
        staff.rank !== 'Lecturer (Unconfirmed)' &&
        staff.rank !== 'Lecturer (Probationary)' &&
        setters.indexOf(staff.name) === -1 &&
        isLecturerAvailable(staff)
    );

    // Try assigning setter as supervisor first
    const setter = eligibleStaff.find(staff => staff.name === session.setter);
    if (setter) {
        return setter;
    }

    // Then try the first examiner
    const firstExaminer = eligibleStaff.find(staff => staff.name === session.firstExaminer);
    if (firstExaminer) {
        return firstExaminer;
    }

    // Finally try the second examiner if necessary
    const secondExaminer = eligibleStaff.find(staff => staff.name === session.secondExaminer);
    if (secondExaminer) {
        return secondExaminer;
    }

    // If no specific examiner is available, pick the highest rank lecturer
    return eligibleStaff.sort((a, b) => a.rank - b.rank)[0] || null;
};

// Function to assign invigilators based on session's student count
const assignInvigilators = (session: ExamSession, staffList: Staff[], supervisor: Staff): Staff[] => {
    let requiredInvigilators = Math.ceil((session.studentCount - 25) / 15);
    if (session.studentCount <= 25) requiredInvigilators = 1;

    // Filter out staff who are of lower rank than supervisor
    const eligibleInvigilators = staffList.filter(staff =>
        staff.rank > supervisor.rank &&
        isLecturerAvailable(staff)
    );

    const invigilators = eligibleInvigilators.slice(0, requiredInvigilators);

    if (invigilators.length < requiredInvigilators) {
        // If not enough invigilators, notify admin for manual intervention
        console.error('Not enough invigilators found for session', session.sessionId);
        // TODO: Notify admin
    }

    return invigilators;
};

// Function to assign hall attendants based on session's student count
const assignHallAttendants = (session: ExamSession): number => {
    return Math.ceil(session.studentCount / 180);
};

// Main service function to allocate staff
export const allocateStaff = async (session: ExamSession) => {
    const staffList = await Staff.findAll();
    const examHalls = await ExamHall.findAll();

    const setters = ['Dr. T.S.R. Liyanage', 'Prof. S.A.J. Ranasinghe']; // Sample list of setters for demonstration

    // Assign supervisor
    const supervisor = assignSupervisor(session, staffList, setters);
    if (!supervisor) {
        console.error('No supervisor available for session', session.sessionId);
        return;
    }

    // Assign invigilators
    const invigilators = assignInvigilators(session, staffList, supervisor);

    // Assign hall attendants
    const hallAttendantsRequired = assignHallAttendants(session);

    // You can now assign these staff to their respective exam halls
    console.log('Supervisor:', supervisor.name);
    console.log('Invigilators:', invigilators.map(inv => inv.name));
    console.log('Hall Attendants required:', hallAttendantsRequired);
};