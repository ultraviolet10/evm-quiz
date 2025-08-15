"use client";

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/Button";
import { useMiniApp } from "@neynar/react";

export type Tab = "home" | "actions" | "context" | "wallet";

interface NeynarUser {
  fid: number;
  score: number;
}

export default function Demo() {
  const { isSDKLoaded, context } =
    useMiniApp();
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [, setNeynarUser] = useState<NeynarUser | null>(null);

  // Fetch Neynar user object when context is available
  useEffect(() => {
    const fetchNeynarUserObject = async () => {
      if (context?.user?.fid) {
        try {
          const response = await fetch(`/api/users?fids=${context.user.fid}`);
          const data = await response.json();
          if (data.users?.[0]) {
            setNeynarUser(data.users[0]);
          }
        } catch (error) {
          console.error("Failed to fetch Neynar user object:", error);
        }
      }
    };

    fetchNeynarUserObject();
  }, [context?.user?.fid]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      <div className="mx-auto py-2 px-4 pb-20">

        {activeTab === "home" && (
          <div className="flex items-center justify-center h-[calc(100vh-200px)] px-6">
            <div className="text-center w-full max-w-md mx-auto">
              <button 
                onClick={() => setActiveTab("actions")}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mx-auto flex items-center justify-center"
              >
                evmquiz
              </button>
              <p className="text-sm text-gray-500 mt-6">Learn EVM through gamified quizzes</p>
            </div>
          </div>
        )}

        {activeTab === "actions" && (
          <div className="space-y-6 px-6 w-full max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Choose Your Game Mode</h2>
              <p className="text-sm text-gray-600">Test your EVM knowledge</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setActiveTab("context")}
                className="w-full p-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-left">
                  <h3 className="font-bold text-lg mb-2">Opcode Quiz</h3>
                  <p className="text-sm opacity-90">Multiple choice questions about EVM opcodes and their values</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("wallet")}
                className="w-full p-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-left">
                  <h3 className="font-bold text-lg mb-2">EVM Connections</h3>
                  <p className="text-sm opacity-90">Find groups of related EVM concepts (coming soon)</p>
                </div>
              </button>
            </div>

            <Button
              onClick={() => setActiveTab("home")}
              className="w-full mt-8"
            >
              ← Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
