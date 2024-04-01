import axios from 'axios';
import './App.css';
import TeamTable from './components/TeamTable/TeamTable';
import { useEffect, useState } from 'react';

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/teams')
      .then(response => {
        setTeams(response.data);
        console.log("response: ", response.data)
      })
      .catch(error => {
        console.log('Error fetching data: ', error);
      })
  }, [])

  return (
    <div className="App">
      {teams.length > 0 ? (
        <TeamTable teams={teams} itemsPerPage={3}></TeamTable>
      ) : (
        <p>Loading teams...</p>
      )}
    </div>
  );
}

export default App;
