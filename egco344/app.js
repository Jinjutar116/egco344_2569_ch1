const express = require('express');

const app = express();
const PORT = 3000;

// Mock student data
const students = [
    { id: '001', name: 'Alice Johnson', department: 'Computer Science', gpa: 3.8 },
    { id: '002', name: 'Bob Smith', department: 'Computer Science', gpa: 3.5 },
    { id: '003', name: 'Carol White', department: 'Civil Engineering', gpa: 3.9 },
    { id: '004', name: 'David Brown', department: 'Mechanical Engineering', gpa: 3.6 },
    { id: '005', name: 'Eve Davis', department: 'Electrical Engineering', gpa: 3.7 },
    { id: '006', name: 'Frank Miller', department: 'Civil Engineering', gpa: 3.4 },
    { id: '007', name: 'Grace Lee', department: 'Mechanical Engineering', gpa: 3.9 },
    { id: '008', name: 'Henry Wilson', department: 'Electrical Engineering', gpa: 3.3 },
];

app.use(express.json());

// API 1: Get all students GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa,
        });
        return acc;
    }, {});

    res.json({
        success: true,
        data: groupedByDept,
    });
});

// API 2: Get individual student GPA by student ID
app.get('/api/students/:id/gpa', (req, res) => {
    const student = students.find((s) => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found',
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});