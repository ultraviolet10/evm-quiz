"use client";

import { Button } from "~/components/ui/Button";
import { useRouter } from "next/navigation";

export default function GameModesPage() {
  const router = useRouter();

  const handleOpcodeQuiz = () => {
    router.push("/opcode-quiz");
  };

  const handleConnections = () => {
    alert("EVM Connections coming soon!");
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-200 pixel-text">EVMQuiz</h1>

        <div className="space-y-6 px-6 w-full max-w-md mx-auto">
          <div className="text-center mb-6 pixel-card rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2 text-purple-200 pixel-text">Choose Your Game Mode</h2>
            <p className="text-purple-300 pixel-text">Test your EVM knowledge</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleOpcodeQuiz}
              className="w-full p-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-green-400/20"
            >
              <div className="text-left">
                <h3 className="font-bold text-lg mb-2 pixel-text">Opcode Quiz</h3>
                <p className="text-sm opacity-90 pixel-text">Multiple choice questions about EVM opcodes and their values</p>
              </div>
            </button>

            <button
              onClick={handleConnections}
              className="w-full p-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-orange-400/20"
            >
              <div className="text-left">
                <h3 className="font-bold text-lg mb-2 pixel-text">EVM Connections</h3>
                <p className="text-sm opacity-90 pixel-text">Find groups of related EVM concepts (coming soon)</p>
              </div>
            </button>
          </div>

          <Button
            onClick={handleBackHome}
            className="w-full mt-8 pixel-text bg-purple-600 hover:bg-purple-500 border-2 border-purple-400/20"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}