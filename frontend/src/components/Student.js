import React, { useState } from 'react';

const Student = ({ student, onDelete }) => {
    // Make the student fields be editable and have a state when they can be edited
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState(student.name);
    const [age, setAge] = useState(student.age);

    // Define the functions that handle update event (delete is handled in the StudentList component)
    function onEdit() {
        setEditable(true);
    }

    function onSave() {
        setEditable(false);
    }

  return (
    <div style={{display: 'flex', justifyContent: 'center', gap:'20px'}}>
      {/* Student name box */}
      <input 
        type='text'
        value={name}
        onChange={(textbox) => setName(textbox.target.value)}
        disabled={!editable} // Disable input field when not editable
      />
      {/* Student age box */}
      <input
        type='number'
        value={age}
        onChange={(textbox) => {setAge(textbox.target.value)}}
        disabled={!editable} 
      />
      {/* Edit/Save buttons*/}
      {!editable ? (<button onClick={onEdit}>Edit</button>) 
      : (<button onClick={onSave}>Save</button>)
      } 
      <button onClick={() => onDelete(student.id)}>Delete</button>   
    </div>
  );
};

export default Student;
