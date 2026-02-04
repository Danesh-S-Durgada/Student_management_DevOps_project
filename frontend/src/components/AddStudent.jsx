import React, { useState } from "react";
import api from "../api";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/students", {
        name,
        rollNo,
      });

      console.log("Student added:", response.data);
      setSuccess("Student added successfully ✅");

      // Clear form
      setName("");
      setRollNo("");
    } catch (err) {
      console.error("Error adding student:", err);
      setError("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddStudent;
