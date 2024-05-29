import './App.css';
import { ServerStatusContext } from './contexts/ServerStatusContext';
import PaginatedTeamTable from './components/PaginatedTeamTable/PaginatedTeamTable';
import { Offline, Online } from 'react-detect-offline';
import { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const {isServerOnline} = useContext(ServerStatusContext);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Online>
                {isServerOnline ? <PaginatedTeamTable itemsPerPage={3} />
                  : "Server is offline"
                }
              </Online>
              <Offline>You're offline. Page will automatically come back when you have internet connection.</Offline>
            </>} />
        </Routes>
      </BrowserRouter >
    </div>
  );
}



export default App;
