import logo from './logo.svg';
import './App.css';
import Student from './components/Student/Student';
import StudentList from './components/StudentList/StudentList';

function App() {
  const studentArray = [
    { id: 1, name: 'Tiron Raul', age: 20 },
    { id: 2, name: 'Dragos Talaba', age: 62 },
    { id: 3, name: 'Cosmin', age: 33 },
    { id: 4, name: 'Youngboy NBA', age: 20 },
    { id: 5, name: '21 Savage', age: 21 },
  ];
  
  const handleDelete = () => {}
  return (
    <div className="App">
      <h1>My Student Management App</h1>
      <StudentList studentList={studentArray}/>
    </div>
  );
}

export default App;
