"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const boardSize = 5;
const totalTiles = boardSize * boardSize;

const tileEffects: { [key: number]: string } = {
  3: "You found a snack! Move forward 2 tiles.",
  7: "Oops! Mud puddle. Go back 1 tile.",
  12: "A butterfly distracted you. Skip your next turn.",
  18: "You met a squirrel! Move forward 3 tiles.",
  22: "Rainy tile! Go back 2 tiles.",
  24: "You found a shortcut! Advance to the last tile.",
};

export default function Home() {
  const [position, setPosition] = useState(0);
  const [message, setMessage] = useState("");
  const [rolling, setRolling] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const handleRoll = () => {
    if (rolling || gameOver) return;
    if (skipped) {
      setMessage("You were distracted last turn. Skipping this turn!");
      setSkipped(false);
      return;
    }

    setRolling(true);
    const dice = rollDice();
    setMessage(`You rolled a ${dice}!`);
    let newPosition = position + dice;

    setTimeout(() => {
      if (newPosition >= totalTiles - 1) {
        setPosition(totalTiles - 1);
        setMessage("🎉 You reached the park! Shiba is happy! 🐶");
        setGameOver(true);
      } else {
        setPosition(newPosition);
        const effect = tileEffects[newPosition];

        if (effect) {
          setTimeout(() => {
            setMessage(effect);
            if (effect.includes("forward 2")) newPosition += 2;
            else if (effect.includes("back 1")) newPosition -= 1;
            else if (effect.includes("Skip")) setSkipped(true);
            else if (effect.includes("forward 3")) newPosition += 3;
            else if (effect.includes("back 2")) newPosition -= 2;
            else if (effect.includes("Advance")) newPosition = totalTiles - 1;

            newPosition = Math.min(newPosition, totalTiles - 1);
            newPosition = Math.max(newPosition, 0);
            setPosition(newPosition);
            if (newPosition === totalTiles - 1) {
              setMessage("🎉 You reached the park! Shiba is happy! 🐶");
              setGameOver(true);
            }
          }, 1200);
        }
      }
      setRolling(false);
    }, 1000);
  };

  const restartGame = () => {
    setPosition(0);
    setMessage("");
    setRolling(false);
    setSkipped(false);
    setGameOver(false);
  };

  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < totalTiles; i++) {
      const isShiba = i === position;
      const isLast = i === totalTiles - 1;
      tiles.push(
        <div
          key={i}
          className={`border rounded-md aspect-square flex items-center justify-center text-xs relative ${
            isLast ? "bg-green-200" : "bg-yellow-100"
          }`}
        >
          {isShiba ? (
            <Image
              src="/shiba-token.png"
              alt="Shiba Inu"
              width={30}
              height={30}
              className="z-10"
            />
          ) : null}
          <span className="absolute top-1 left-1 text-[10px]">{i + 1}</span>
        </div>
      );
    }
    return tiles;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">🐕 Shiba’s Park Quest 🎲</h1>
      <div
        className="grid grid-cols-5 gap-1 max-w-xs w-full mb-4"
        style={{ aspectRatio: "1 / 1" }}
      >
        {renderTiles()}
      </div>
      <p className="text-sm mb-2 h-10 text-center">{message}</p>
      {!gameOver ? (
        <button onClick={handleRoll} disabled={rolling}>
          {rolling ? "Rolling..." : "Roll Dice 🎲"}
        </button>
      ) : (
        <button onClick={restartGame}>Restart Game 🔁</button>
      )}
    </main>
  );
}
