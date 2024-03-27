import logo from './logo.svg';
import './App.css';
import TeamTable from './components/TeamTable/TeamTable';
import { useState } from 'react';

function App() {

  const teams = [
    { id: 1, name: "G2", logo: "https://licensinginternational.org/wp-content/uploads/2020/05/redeye.png", region: "EU", players: [{ id: 1, name: "caps", kda: 4.23, position: "Mid" }, { id: 2, name: "hans sama", kda: 3.45, position: "ADC" }, { id: 3, name: "mikyx", kda: 0.97, position: "Support" }, { id: 4, name: "Yike", kda: 2.03, position: "Jungle" }, { id: 5, name: "Broken Blade", kda: 2.97, position: "Top" }] },
    { id: 2, name: "Fnatic", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819669150_fnc-2021-worlds.png", region: "EU", players: [{ id: 6, name: "Razork", kda: 2.45, position: "Jungle" }, { id: 7, name: "Oscarinin", kda: 3.08, position: "Top" }, { id: 8, name: "humanoid", kda: 2.04, position: "Mid" }, { id: 9, name: "noah", kda: 3.40, position: "ADC" }, { id: 10, name: "jun", kda: 0.89, position: "Support" }] },
    { id: 3, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "EU", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
    { id: 4, name: "kt Rolsters", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fkt_darkbackground.png", region: "KR", players: [{ id: 14, name: "PerfecT", kda: 1.48, position: "Top" }, { id: 15, name: "bdd", kda: 4.88, position: "mid" }, { id: 16, name: "Deft", kda: 6.45, position: "ADC" }, {id: 17, name:"", kda:1.45}] },
    { id: 5, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "KR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
    { id: 6, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "TR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
    { id: 7, name: "FlyQuest", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fflyquest-new-on-dark.png", region: "NA", players: [{ id: 14, name: "bussio", kda: 1.48, position: "Support" }, { id: 15, name: "Inspired", kda: 3.08, position: "Jungle" }, { id: 16, name: "Jensen", kda: 1.09, position: "Mid" }, { id: 17, name: "Bwipo", kda: 2.79, position: "Top" }, { id: 18, name: "Massu", kda: 2.34, position: "ADC" }] },
  ];

  return (
    <div className="App">
      <TeamTable teams={teams} itemsPerPage={3}></TeamTable>
    </div>
  );
}

export default App;
