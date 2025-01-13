import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="bg-white p-4 rounded shadow-md">
        {leaderboard.map((entry, index) => (
          <li key={index} className="border-b last:border-b-0 py-2">
            <span className="font-semibold">{index + 1}. {entry.name}</span> : <span className="text-blue-500">{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;