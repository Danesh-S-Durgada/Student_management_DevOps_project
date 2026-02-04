// import React, { useState } from "react";

// const AttendanceForm = ({ students }) => {
//   const [studentId, setStudentId] = useState("");
//   const [status, setStatus] = useState("Present");
//   const [date] = useState(new Date().toISOString().split("T")[0]);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     markAttendance({ studentId, date, status })
//       .then((response) => alert("Attendance marked successfully"))
//       .catch((err) => console.log(err));
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Student:
//         <select
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//         >
//           <option value="">Select Student</option>
//           {students.map((student) => (
//             <option key={student._id} value={student._id}>
//               {student.name}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Status:
//         <select value={status} onChange={(e) => setStatus(e.target.value)}>
//           <option value="Present">Present</option>
//           <option value="Absent">Absent</option>
//         </select>
//       </label>
//       <button type="submit">Mark Attendance</button>
//     </form>
//   );
// };

// export default AttendanceForm;

import React, { useState } from "react";
import api from "../api";

const AttendanceForm = ({ students }) => {
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !date || !status) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/students/attendance", {
        studentId,
        date,
        status,
      });

      console.log("Attendance saved:", response.data);
      setSuccess("Attendance marked successfully ✅");

      // Reset form
      setStudentId("");
      setDate("");
      setStatus("present");
    } catch (err) {
      console.error("Axios error full object:", err);
      console.error("Response:", err.response);
      console.error("Message:", err.message);
      setError(err.response?.data?.message || "Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        {/* Student dropdown */}
        <div>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.rollNo})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Status */}
        <div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit Attendance"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AttendanceForm;
