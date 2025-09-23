import React from 'react';

// TODO: Define a type for a leaderboard entry
interface LeaderboardEntry {
  rank: number;
  display_name: string;
  avatar_url: string;
  xp_total: number;
}

// This is a server-side component that fetches leaderboard data.
async function getLeaderboard() {
  // In a real app, you would fetch this from your API.
  const res = await fetch('http://localhost:3000/api/leaderboard');
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();

}

const LeaderboardPage = async () => {
  const leaderboard = await getLeaderboard();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Leaderboard</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          See who's at the top of their game.
        </p>
      </header>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {leaderboard.map((user: LeaderboardEntry, index: number) => (
            <li key={user.rank} className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400 w-8">{user.rank}</span>
                <img src={user.avatar_url} alt={user.display_name} className="w-12 h-12 rounded-full ml-4" />
                <span className="ml-4 text-lg font-medium text-gray-900 dark:text-white">{user.display_name}</span>
              </div>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{user.xp_total} XP</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderboardPage;
