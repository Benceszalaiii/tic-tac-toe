"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TicTacToeEngine, {
  GameStatus,
  Player,
} from "tic-tac-toe-minimax-engine";

export default function Page() {
  const [game, setGame] = useState<TicTacToeEngine>(
    new TicTacToeEngine(Player.PLAYER_ONE)
  );
  const [score, setScore] = useState<number | null>(null);
  const resetGame = () => {
    setGame(new TicTacToeEngine(Player.PLAYER_ONE));
    setScore(null);
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setStarted(false);
  };
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (score !== null) {
      if (score === 1) {
        toast.success("You won!");
      }
      if (score === 2) {
        toast.error("You lost!");
      }
      if (score === 3) {
        toast.info("It's a draw!");
      }
    }
  }, [score]);
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  useEffect(() => {
    setBoard(game.board);
  }, [game]);
  const checkState = (currentPlayer: "x" | "o", status: GameStatus) => {
    if (status === GameStatus.ONGOING) {
      setScore(null);
      return false;
    }
    if (status === GameStatus.DRAW) {
      setScore(3);
      return true;
    }
    if (currentPlayer === "x") {
      setScore(1);
      return true;
    }
    setScore(2);
    return true;
  };

  const movePlayer = (x: number, y: number) => {
    if (score !== null || !started) {
      return;
    }
    try {
      const status = game.makeNextMove(x, y);
      const newBoard = [...board];
      console.log("X moved to ", x, y);
      newBoard[y][x] = 1;
      setBoard(newBoard);
      if (checkState("x", status)) {
        return;
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred");
      }
      return;
    }
    const rSteps = game.getBestMove();
    const status2 = game.makeNextMove(rSteps.x, rSteps.y);
    console.log("O (bot) moved to ", rSteps.x, rSteps.y);
    const newBoard2 = [...board];
    newBoard2[rSteps.y][rSteps.x] = 2;
    setBoard(newBoard2);
    if (checkState("o", status2)) {
      return;
    }
  };
  const startGame = () => {
    setStarted(true);
  };
  return (
    <main className="min-h-screen px-4 w-full flex-col gap-4 flex justify-center items-center bg-zinc-800">
      <div className="fixed top-12 w-full flex flex-col items-center px-4 gap-6 justify-center z-20 ">
        <h2 className="bg-gradient-to-r text-transparent bg-clip-text font-caveat text-4xl w-full text-center from-indigo-500 to-violet-500">Impossible Tic Tac Toe</h2>
        <p className="font-mono text-sm italic text-center leading-loose font-semibold mt-4">Fight against AI using Minimax algorithm. Is it impossible to beat? Find it for yourself! <br /> Click start to get started</p>
        <div className="flex justify-center items-center space-x-4">
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-3 gap-2 place-items-center",
          score || !started ? "cursor-not-allowed" : ""
        )}
      >
        {board.map((row, index: number) => {
          return row.map((cell, cellIndex: number) => {
            return (
              <motion.div
                key={`${index}-${cellIndex}`}
                className={cn(
                  "h-20 select-none w-20 flex rounded-lg border border-gray-500 justify-center items-center",
                  started ? "cursor-pointer hover:border-gray-300" : "", score === 2 ? "border-red-500 hover:border-red-500" : score === 3 ? "border-amber-500 hover:border-amber-500" : ""
                )}
                onClick={() => {
                  movePlayer(cellIndex, index);
                }}
              >
                <h1 className="text-white z-20">
                  {cell === 1 ? "X" : cell === 2 ? "O" : ""}
                </h1>
              </motion.div>
            );
          });
        })}
      </div>
      {started ? (
        <Button variant={"destructive"} className="w-32" onClick={resetGame}>
          Reset
        </Button>
      ) : (
        <Button
          variant={"destructive"}
          className="bg-emerald-600 w-32 hover:bg-emerald-700 active:bg-emerald-700"
          onClick={startGame}
        >
          Start
        </Button>
      )}
      <footer className="fixed bottom-4 w-full text-center font-mono">Made by <Link className="underline underline-offset-2" href={"https://www.github.com/benceszalaiii"}>Benceszalaiii</Link></footer>
    </main>
  );
}
