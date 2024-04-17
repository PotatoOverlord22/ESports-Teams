import './App.css';
import PaginatedTeamTable from './components/PaginatedTeamTable/PaginatedTeamTable';

function App() {
  

  return (
    <div className="App">
      <PaginatedTeamTable itemsPerPage={3}/>
    </div>
  );
}

export default App;
