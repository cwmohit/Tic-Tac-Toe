import { useEffect, useRef, useState } from "react";

const useTicTacToe = ({
    cells
}) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [emptyCells, setEmptyCells] = useState(cells);
  const [userMoves, setUserMoves] = useState([]);
  const [botMoves, setBotMoves] = useState([]);
  const [disableUser, setDisableUser] = useState(false);
  const botRef = useRef(null);

  const onClickCell = (cell) => {
    if (disableUser) return;
     if(userMoves.includes(cell) || botMoves.includes(cell)) return;
     setUserMoves([...userMoves, cell]);
     setEmptyCells(emptyCells.filter(c => c !== cell));
  };

  const getCellColor = (cell) => {
    if(userMoves.includes(cell)) return 'bg-[#95E52E] text-purple-900';
    if(botMoves.includes(cell)) return 'bg-purple-500 text-[#95E52E]';
    return 'bg-purple-900';
  }

  const getValue = (cell) => {
    if(userMoves.includes(cell)) return 'X';
    if(botMoves.includes(cell)) return 'O';
    return '';
  }

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (userMoves.includes(a) && userMoves.includes(b) && userMoves.includes(c))
        return 'user';
      if (botMoves.includes(a) && botMoves.includes(b) && botMoves.includes(c))
        return 'bot';
    }
    return null;
  }

  const checkDraw = () => {
    if (emptyCells.length === 0) return true;
    return false;
  }

 const resetGame = () => {
  setBotMoves([]);
  setUserMoves([]);
  setEmptyCells(cells);
  clearTimeout(botRef.current);
  setDisableUser(false);
 }

  useEffect(() => {
    if(userMoves.length){
      setDisableUser(true);
      botRef.current = setTimeout(() => {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setBotMoves([...botMoves, randomCell]);
        setEmptyCells(emptyCells.filter((c) => c !== randomCell));
        setDisableUser(false);
      }, 1000);
    }
  }, [userMoves])

  useEffect(() => {
    const winner = checkWin();
    const draw = checkDraw();
    setTimeout(() => {
      if (winner) {
        if (winner === "user") {
          alert("You win!");
          setGameHistory([...gameHistory, {win: 'user', time: new Date()}])
        } else {
          alert("Bot wins!");
          setGameHistory([...gameHistory, {win: 'bot', time: new Date()}])
        }
        resetGame();
      }else if(draw){
        alert("It's a draw!");
        setGameHistory([...gameHistory, {win: 'draw', time: new Date()}])
        resetGame();
      }
    }, 500);
  }, [userMoves, botMoves]);

  return {
    gameHistory,
    onClickCell,
    getCellColor,
    getValue,
  }
}

export default useTicTacToe;