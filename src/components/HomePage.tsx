"use client";

import { useRouter } from "next/navigation";

interface HomePageProps {
  title?: string;
}

export default function HomePage({ title = "EVMQuiz" }: HomePageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-200 pixel-text">{title}</h1>

        <div className="flex items-center justify-center h-[calc(100vh-200px)] px-6">
          <div className="text-center w-full max-w-md mx-auto">
            <div 
              onClick={() => {
                router.push("/game-modes");
              }}
              className="w-52 h-52 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 mx-auto flex items-center justify-center cursor-pointer select-none border-4 border-purple-400/20 pixel-border"
              role="button"
              tabIndex={0}
            >
              <span className="pixel-text">evmquiz</span>
            </div>
            <p className="text-lg text-purple-300 mt-8 pixel-text">Learn EVM through gamified quizzes</p>
          </div>
        </div>
      </div>
    </div>
  );
}