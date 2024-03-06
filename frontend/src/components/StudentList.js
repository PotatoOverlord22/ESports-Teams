import React, { useState } from 'react';
import Student from './Student';

const StudentList = ({studentList}) => {
  const [students, setStudents] = useState(studentList);
  const [adding, setAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({name: '', age: ''});

  function handleDeleteStudent(id) {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  function handleAddStudent(event) {
    // Prevent form submission from refreshing the page
    event.preventDefault();
    setStudents([...students, {
        id: Math.max(...students.map((student) => student.id)) + 1,
        name: newStudent.name,
        age: newStudent.age,
    }])
    console.log(newStudent);
    setNewStudent({name: '', age:''});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };


  return (
    <div>
      <h1>Student List</h1>
      {students.map((student) => (
        <Student key={student.id} student={student} onDelete={handleDeleteStudent} />
      ))}
    {adding ? ( <div>
        <form onSubmit={handleAddStudent}>
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="age"
          value={newStudent.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <button type='submit'> Add </button>
        <button onClick={() => setAdding(false)}> Cancel </button>
    </form>
    </div>
    ) 
      : (<div>
        <button onClick={() => setAdding(true)}>Add a student</button>
        </div>)
      }

    </div>
  );
};

export default StudentList;
