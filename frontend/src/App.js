import './App.css';
import { ServerStatusContext } from './contexts/ServerStatusContext';
import PaginatedTeamTable from './components/PaginatedTeamTable/PaginatedTeamTable';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import { Offline, Online } from 'react-detect-offline';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

function App() {
  const { isServerOnline } = useContext(ServerStatusContext);

  return (
    <div className="App">
      <>
        <Online>
          {isServerOnline ? (<Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute redirectPath='/login'>
                  <>
                    <Online>
                      {isServerOnline ? (
                        <PaginatedTeamTable itemsPerPage={3} />
                      ) : (
                        "Server is offline"
                      )}
                    </Online>
                    <Offline>
                      You're offline. Page will automatically come back when you
                      have internet connection.
                    </Offline>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>) : "Server is offline"}
        </Online>
        <Offline>
          You're offline. Page will automatically come back when you
          have internet connection.
        </Offline>
      </>
    </div>
  );
}

export default App;
