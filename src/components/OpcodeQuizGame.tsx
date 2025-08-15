"use client";

import { useState, useCallback } from "react";
import { getRandomOpcodes, Opcode } from "~/lib/evmData";
import { Button } from "./ui/Button";

interface QuizQuestion {
  opcode: Opcode;
  correctAnswer: string;
  options: string[];
  questionType: 'value' | 'hex' | 'description' | 'gas';
}

interface OpcodeQuizGameProps {
  onBack: () => void;
}

export function OpcodeQuizGame({ onBack }: OpcodeQuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const questionTypes: QuizQuestion['questionType'][] = ['value', 'hex', 'description', 'gas'];

  const generateQuestion = useCallback((): QuizQuestion => {
    const randomOpcodes = getRandomOpcodes(4);
    const correctOpcode = randomOpcodes[0];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let correctAnswer: string;
    let options: string[];

    switch (questionType) {
      case 'value':
        correctAnswer = correctOpcode.value;
        options = randomOpcodes.map(op => op.value);
        break;
      case 'hex':
        correctAnswer = correctOpcode.hex;
        options = randomOpcodes.map(op => op.hex);
        break;
      case 'description':
        correctAnswer = correctOpcode.description;
        options = randomOpcodes.map(op => op.description);
        break;
      case 'gas':
        correctAnswer = correctOpcode.gas.toString();
        options = randomOpcodes.map(op => op.gas.toString());
        break;
    }

    // Shuffle options
    options.sort(() => 0.5 - Math.random());

    return {
      opcode: correctOpcode,
      correctAnswer,
      options,
      questionType
    };
  }, [questionTypes]);

  const startNewQuestion = useCallback(() => {
    const question = generateQuestion();
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [generateQuestion]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setQuestionCount(0);
    setStreak(0);
    startNewQuestion();
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion?.correctAnswer) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    
    setQuestionCount(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (questionCount >= 10) {
      setGameStarted(false);
      return;
    }
    startNewQuestion();
  };

  const getQuestionText = () => {
    if (!currentQuestion) return "";
    
    switch (currentQuestion.questionType) {
      case 'value':
        return `What is the decimal value of the ${currentQuestion.opcode.name} opcode?`;
      case 'hex':
        return `What is the hexadecimal value of the ${currentQuestion.opcode.name} opcode?`;
      case 'description':
        return `What does the ${currentQuestion.opcode.name} opcode do?`;
      case 'gas':
        return `How much gas does the ${currentQuestion.opcode.name} opcode consume?`;
    }
  };

  const getOptionColor = (option: string) => {
    if (!isAnswered) return "pixel-card hover:bg-purple-600/20 text-purple-200 border-purple-400/30";
    if (option === currentQuestion?.correctAnswer) return "bg-green-600 text-white border-green-400";
    if (option === selectedAnswer && option !== currentQuestion?.correctAnswer) return "bg-red-600 text-white border-red-400";
    return "pixel-card text-purple-300 border-purple-400/20";
  };

  if (!gameStarted) {
    return (
      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="pixel-card rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2 text-purple-200 pixel-text">EVM Opcode Quiz</h2>
            <p className="text-purple-300 pixel-text">Test your knowledge of Ethereum Virtual Machine opcodes</p>
          </div>

          {questionCount > 0 && (
            <div className="pixel-card rounded-lg p-4 space-y-2 border-blue-400/30">
              <h3 className="font-semibold text-blue-300 pixel-text">Game Results</h3>
              <p className="text-blue-200 pixel-text">Score: {score}/10</p>
              <p className="text-blue-200 pixel-text">Best Streak: {bestStreak}</p>
              <p className="text-sm text-blue-300 pixel-text">
                {score >= 8 ? "Excellent! 🔥" : score >= 6 ? "Good job! 👍" : "Keep learning! 📚"}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button onClick={startGame} className="w-full pixel-text bg-green-600 hover:bg-green-500 border-2 border-green-400/20">
              {questionCount > 0 ? "Play Again" : "Start Quiz"}
            </Button>
            <Button onClick={onBack} className="w-full pixel-text bg-purple-600 hover:bg-purple-500 border-2 border-purple-400/20">
              ← Back to Game Modes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="px-6 py-4 max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-purple-300 pixel-text">Question {questionCount + 1}/10</span>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-300 pixel-text">Score: {score}</span>
            <span className="text-sm text-orange-300 pixel-text">Streak: {streak}</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-600 rounded-full h-3 border border-purple-400/30">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((questionCount + 1) / 10) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="pixel-card rounded-lg p-4 border-blue-400/30">
          <h3 className="font-semibold text-blue-200 mb-2 pixel-text">{getQuestionText()}</h3>
          <div className="text-sm text-blue-300 pixel-text">
            Category: {currentQuestion.opcode.category} • 
            Inputs: {currentQuestion.opcode.inputs} • 
            Outputs: {currentQuestion.opcode.outputs}
          </div>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-lg transition-all duration-300 border-2 ${getOptionColor(option)}`}
            >
              <span className="font-mono pixel-text">{option}</span>
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 pixel-text ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-600/20 text-green-200 border-green-400' : 'bg-red-600/20 text-red-200 border-red-400'}`}>
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <span className="font-semibold">Correct! 🎉</span>
              ) : (
                <span className="font-semibold">Incorrect. The correct answer was: {currentQuestion.correctAnswer}</span>
              )}
            </div>

            <Button onClick={nextQuestion} className="w-full pixel-text bg-purple-600 hover:bg-purple-500 border-2 border-purple-400/20">
              {questionCount >= 9 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}