import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import TeamTable from './components/TeamTable/TeamTable';
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function App() {
  const studentArray = [
    { id: 1, name: 'Tiron Raul', age: 20 },
    { id: 2, name: 'Dragos Talaba', age: 62 },
    { id: 3, name: 'Cosmin', age: 33 },
    { id: 4, name: 'Youngboy NBA', age: 20 },
    { id: 5, name: '21 Savage', age: 21 },
  ];

  const teams = [
    { id: 1, name: "G2", logo: "https://licensinginternational.org/wp-content/uploads/2020/05/redeye.png", region: "EU", players: [{ name: "caps", kda: 4.23, position: "Mid" }, { name: "hans sama", kda: 3.45, position: "ADC" }, { name: "mikyx", kda: 0.97, position: "Support" }, { name: "Yike", kda: 2.03, position: "Jungle" }, { name: "Broken Blade", kda: 2.97, position: "Top" }] },
    { id: 2, name: "Fnatic", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819669150_fnc-2021-worlds.png", region: "EU", players: [{ name: "Razork", kda: 2.45, position: "Jungle" }, { name: "Oscarinin", kda: 3.08, position: "Top" }, { name: "humanoid", kda: 2.04, position: "Mid" }, { name: "noah", kda: 3.40, position: "ADC" }, { name: "jun", kda: 0.89, position: "Support" }] },
    { id: 3, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "EU", players: [{ name: "elyoya", kda: 3.48, position: "Jungle" }, { name: "supa", kda: 3.88, position: "ADC" }, { name: "alvaro", kda: 0.45, position: "Support" }] },
    { id: 4, name: "FlyQuest", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fflyquest-new-on-dark.png", region: "NA", players: [{ name: "bussio", kda: 1.48, position: "Support" }, { name: "Inspired", kda: 3.08, position: "Jungle" }, { name: "Jensen", kda: 1.09, position: "Mid" }, { name: "Bwipo", kda: 2.79, position: "Top" }, { name: "Massu", kda: 2.34, position: "ADC" }] },
    { id: 5, name: "verylongtest name of a random team just to test length and stuff you know  and how it will all fit in one screen or if it will go on the next row", logo: "mdk-logo-path", region: "verylongtest name of a region team just to test length and stuff you know  and how it will all fit in one screen or if it will go on the next row", players: [{ name: "verylongtest name of a random team just to test length and stuff you know  and how it will all fit in one screen or if it will go on the next row", kda: 3.48 }, { name: "verylongtest name of a random team just to test length and stuff you know  and how it will all fit in one screen or if it will go on the next row", kda: 99999999.9999999 }, { name: "verylongtest name of a random team just to test length and stuff you know  and how it will all fit in one screen or if it will go on the next row", kda: 0.45 }] }
  ];

  return (
    <div className="App">
      <TeamTable teamsList={teams}></TeamTable>
    </div>
  );
}

export default App;
