import nodemailer from 'nodemailer';
import {Lecturer} from "../models/Lecture";
import examSessionRouter from "../routes/examSessionRouter";
import {ExamSession} from "../models/examSession";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "",
        pass: "", // App password
    },
});

const sendExamHallAllocation = async (lecturerData:Lecturer, examDetails: ExamSession) => {
    try {
        const info = await transporter.sendMail({
            from: 'examination-office@university.edu',
            to: lecturerData.email,
            subject: 'Exam Hall Allocation Notification',
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Exam Hall Allocation - University Name</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f5f5f5;
                            margin: 0;
                            padding: 0;
                            color: #333;
                        }
                        .container {
                            width: 100%;
                            max-width: 800px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                            border-radius: 8px;
                        }
                        .header {
                            text-align: center;
                            padding: 20px;
                            background-color: #e3f2fd;
                            border-radius: 8px;
                            margin-bottom: 20px;
                        }
                        .header h1 {
                            color: #1565c0;
                            margin-bottom: 10px;
                        }
                        .section-title {
                            font-size: 18px;
                            font-weight: bold;
                            color: #1565c0;
                            margin-top: 25px;
                            border-bottom: 2px solid #bbdefb;
                            padding-bottom: 5px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 10px;
                            margin-bottom: 20px;
                        }
                        table td, table th {
                            border: 1px solid #ddd;
                            padding: 12px;
                            text-align: left;
                        }
                        .details-table th {
                            background-color: #e3f2fd;
                        }
                        .message {
                            background-color: #fff8e1;
                            padding: 15px;
                            border-left: 4px solid #ffc107;
                            margin: 20px 0;
                            line-height: 1.6;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            padding-top: 20px;
                            font-size: 12px;
                            color: #777;
                            border-top: 1px solid #ddd;
                        }
                        .important {
                            color: #d32f2f;
                            font-weight: bold;
                        }
                    </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Exam Hall Allocation Notification</h1>
                                <p>University Examination Department</p>
                            </div>
                            
                            <p>Dear ${lecturerData.name},</p>
                            
                            <div class="message">
                                <p>This is to inform you about your invigilation duties for the upcoming examinations. Please find below your allocated exam hall details:</p>
                            </div>
                            
                            <div class="section-title">Your Examination Details</div>
                            <table class="details-table">
                                <tr>
                                    <th>Course Code</th>
                                    <td>${examDetails.subjectCode}</td>
                                </tr>
                            
                                <tr>
                                    <th>Exam Date</th>
                                    <td>${examDetails.examDate}</td>
                                </tr>
                                <tr>
                                    <th>Exam Time</th>
                                    <td>${examDetails.startTime}</td>
                                </tr>
                                
                               <!--
                                <tr>
                                    <th>Building</th>
                                    <td></td>
                                </tr>
                                -->

                                <tr>
                                    <th>Number of Students</th>
                                    <td>${examDetails.studentCount}</td>
                                </tr>
                            </table>
                            
                            <div class="section-title">Important Instructions</div>
                            <ul>
                                <li>Please arrive at the exam hall <span class="important">30 minutes before</span> the scheduled exam time.</li>
                                <li>Collect the exam materials from the chief invigilator.</li>
                                <li>Ensure all students follow examination rules and regulations.</li>
                                <li>Report any irregularities immediately to the examination office.</li>
                            </ul>
                            
                            <div class="message">
                                <p>If you have any questions or are unable to fulfill your invigilation duties, please contact the Examination Office immediately at <a href="mailto:exams@university.edu">exams@university.edu</a> or call +123 456 7890.</p>
                            </div>
                            
                            <p>Thank you for your cooperation in ensuring the smooth conduct of examinations.</p>
                            
                            <p>Best regards,<br>
                            Examination Office<br>
                            University Name</p>
                            
                            <div class="footer">
                                <p>This is an automated notification. Please do not reply to this email.</p>
                                <p>&copy; ${new Date().getFullYear()} University Name. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>`
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};

export { sendExamHallAllocation };