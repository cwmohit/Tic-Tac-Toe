import TicTacToeCell from "@/components/TicTacToeCell";
import TicTacToeResult from "@/components/TicTacToeResult";
import useTicTacToe from "@/hooks/useTicTacToe";
const cells = [0,1,2,3,4,5,6,7,8];

export default function GameHome() {
  const {
    onClickCell,
    getCellColor,
    getValue,
    gameHistory
  } = useTicTacToe({ cells })

  return (
    <div className="min-h-screen w-full p-8" style={{
      background: "rgb(36 4 62)"
    }}>
      <div className="w-[320px] md:w-[400px] h-[320px] xl:h-[400px] gap-2 mx-auto grid grid-cols-3 p-2 justify-center rounded-2xl bg-purple-700 border-2 border-yellow-[#95E52E]">
        {cells?.map((cell) => (
          <TicTacToeCell
            key={cell}
            cell={cell}
            onClickCell={onClickCell}
            cellColor={getCellColor(cell)}
            value={getValue(cell)}
          />
        ))}
      </div>

      <hr className="mt-14 md:mt-20 border-t border-gray-500" />
      <TicTacToeResult gameHistory={gameHistory} />
    </div>
  );
}
