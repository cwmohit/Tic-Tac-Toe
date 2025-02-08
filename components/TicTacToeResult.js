import React from 'react'

const TicTacToeResult = ({
    gameHistory,
}) => {
  const getGameResultTextColor = (game) => {
    if (game.win === "user") return "text-[#95E52E]";
    else if (game.win === "bot") return "text-purple-500";

    return "text-white";
  };

  return (
    <div className="py-4 md:p-6">
      <h3 className="text-white font-semibold text-lg">Game History</h3>
      <div className="flex flex-col-reverse overflow-auto">
        {gameHistory.map((game, index) => (
          <div
            className="flex justify-between w-full items-center mt-2 border-dotted border-b border-gray-300 pb-2"
            key={index}
          >
            <div className="flex flex-col gap-1 text-white">
              <p className="text-white font-semibold text-sm">
                Game {index + 1}
              </p>
              {game.time?.toLocaleTimeString()}
            </div>
            <span className={`${getGameResultTextColor(game)} font-semibold`}>
              {game?.win === "user" ? "Win" : game?.win === "bot" ? "Lost" : "Tie"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicTacToeResult;