import React, { useEffect, useState } from "react";
import api from "../api";
import AttendanceForm from "./AttendanceForm";

const StudentList = () => {
  const [students, setStudents] = useState([]); // ✅ initialize as array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError("Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div>
        <h2>Students List</h2>

        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                {student.name} ({student.rollNo})
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "red" }}>No Students found</p>
        )}
      </div>

      <AttendanceForm students={students} />
    </>
  );
};

export default StudentList;
