import StudentList from "./components/StudentList";
import AttendanceForm from "./components/AttendanceForm";
import AddStudent from "./components/AddStudent";
// import api from "../api/axios";
// import StudentList from "./components/StudentList";
// import AttendanceForm from "./components/AttendanceForm";
function App() {
  // const [students, setStudents] = useState([]);
  // useEffect(() => {
  //   getStudents()
  //     .then((response) => setStudents(response.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div>
      <h1>Attendance Management</h1>
      <AddStudent/>
      <StudentList />
      {/* <AttendanceForm students={students} /> */}
    </div>
  );
}

export default App;
