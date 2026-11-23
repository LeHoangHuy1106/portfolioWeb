import React, { useState } from 'react';
import '../styles/Project.css';
import ListGame from '../Config/listGameData';

interface ProjectProps {
  onSelectGame: (gameName: string) => void; // Hàm gọi khi chọn game
}

const Project: React.FC<ProjectProps> = ({ onSelectGame }) => {
  const [search, setSearch] = useState<string>('');
  const [players, setPlayers] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const filteredGames = ListGame.filter((game) => {
    const matchesSearch = game.gameName.toLowerCase().includes(search.toLowerCase());
    const matchesPlayers =
      players === '' ||
      (players === '1' && game.teamSize === 1) ||
      (players === '2+' && game.teamSize > 1);
    const matchesPlatform = platform === '' || game.platform.includes(platform);
    const matchesCategory = category === '' || game.category === category;
    return matchesSearch && matchesPlayers && matchesPlatform && matchesCategory;
  });

  return (
    <div className="project-container">
      <h1>My Games</h1>
      <div className="filter-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Search game name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        >
          <option value="">All Players</option>
          <option value="1">1 Player</option>
          <option value="2+">2+ Players</option>
        </select>
        <select
          className="filter-select"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="Web App">Web app</option>
          <option value="Mobile">Mobile</option>
          <option value="PC">PC</option>
          <option value="Console">Console</option>
        </select>
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Casual">Casual</option>
          <option value="Action">Action</option>
          <option value="Strategy">Strategy</option>
        </select>
      </div>
      <div className="game-list">
        {filteredGames.map((game) => (
          <div
            className="game-card"
            key={game.gameName}
            onClick={() => onSelectGame(game.gameName)} // Gọi khi chọn game
          >
            <img src={game.banner} alt={game.gameName} className="game-banner" />
            <div className="game-details">
              <img src={game.icon} alt={game.gameName} className="game-icon" />
              <div>
                <h2 className="game-title">{game.gameName}</h2>
                <p className="game-platform">{game.platform.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
