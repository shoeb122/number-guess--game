"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const NumberGuessingGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [targetNumber, setTargetNumber] = useState(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (gameStarted && targetNumber === 0) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted]);

  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
    setTargetNumber(0); // Reset target number
    setFeedback(null);
  };

  const handlePauseGame = (): void => {
    setPaused(true);
  };

  const handleResumeGame = (): void => {
    setPaused(false);
  };

  const handleGuess = (): void => {
    if (userGuess === "") {
      setFeedback("Please enter a number.");
      return;
    }

    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true);
      setFeedback("Correct! You guessed it!");
    } else {
      setAttempts(attempts + 1);
      setFeedback("Incorrect guess. Try again!");
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
    setFeedback(null);
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUserGuess(value === "" ? "" : parseInt(value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Number Guessing Game
        </h1>
        <p className="text-center text-black mb-4">
          Try to guess the number between 1 and 10!
        </p>
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            {feedback && (
              <div className="text-center text-black mb-2">{feedback}</div>
            )}
            <div className="text-center text-black">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberGuessingGame;
