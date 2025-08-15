"use client";

import { OpcodeQuizGame } from "~/components/OpcodeQuizGame";
import { useRouter } from "next/navigation";

export default function OpcodeQuizPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/game-modes");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-200 pixel-text">EVMQuiz</h1>
        <OpcodeQuizGame onBack={handleBack} />
      </div>
    </div>
  );
}