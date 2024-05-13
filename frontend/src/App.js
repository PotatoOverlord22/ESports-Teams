import './App.css';
import axios from 'axios';
import { API_STATUS_URL } from './Constants';
import PaginatedTeamTable from './components/PaginatedTeamTable/PaginatedTeamTable';
import { Offline, Online } from 'react-detect-offline';
import { useState } from 'react';

function App() {
  const [isServerOnline, setIsServerOnline] = useState(false);

  const makeRequestToServer = () => {
    axios.get(API_STATUS_URL)
      .then(response => {
        setIsServerOnline(true);
      })
      .catch(error => {
        setIsServerOnline(false);
      });
  };

  makeRequestToServer();

  setInterval(makeRequestToServer, 3000);

  return (
    <div className="App">
      <Online>
        { isServerOnline ? <PaginatedTeamTable itemsPerPage={3} />
          :  "Server is offline"
        }
      </Online>
      <Offline>You're offline. Page will automatically come back when you have internet connection.</Offline>
    </div>
  );
}



export default App;
