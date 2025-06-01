"use client"

import Link from "next/link";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  // Pre-fetch actor count data using the query client directly
  const queryClient = useQueryClient();
  
  // Use effect to prefetch actor count data once when component mounts
  useEffect(() => {
    const prefetchData = async () => {
      // Prefetch the actor count data so it's available when navigating to the game page
      await queryClient.prefetchQuery({
        queryKey: ['actors', 'count'],
        queryFn: () => fetch('/api/actors/getActorCount').then(res => res.json())
      });
    };
    
    prefetchData();
  }, [queryClient]);
  return (
    <div 
      className="min-h-screen p-4 font-sans bg-gray-900"
      style={{
        background: 'radial-gradient(circle at top left, #3a1a54, #111111), linear-gradient(to bottom right, #111111, #1c1c3d)'
      }}
    >
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-[15px] sm:gap-[20px] items-center py-6 sm:py-8 px-4 sm:px-8 bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700 shadow-2xl" 
        style={{
          boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 0, 128, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        <h1 
          className="text-4xl sm:text-5xl font-bold text-center tracking-tight" 
          style={{ 
            background: 'linear-gradient(90deg, #0ea5e9 0%, #d946ef 50%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 20px rgba(217, 70, 239, 0.5)'
          }}
        >
          NEPO BABY GAME
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-white text-center mb-2 sm:mb-4">How To Play</p>
        
        <div className="text-white w-full max-w-2xl">
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gray-900/70 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-cyan-300">What is a Nepo Baby?</h2>
            <p className="mb-3">
              A &ldquo;nepo baby&rdquo; (short for nepotism baby) is a term for celebrities who had a significant career boost from their famous family connections.
            </p>
          </div>
          
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gray-900/70 rounded-lg border border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-cyan-300">Game Rules</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>You&apos;ll be shown two actors side by side.</li>
              <li>One is a &ldquo;nepo baby&rdquo; who has famous family connections in entertainment.</li>
              <li>Click on the actor you think is the nepo baby.</li>
              <li>You&apos;ll get instant feedback on whether your guess was correct.</li>
              <li>Click &ldquo;New Actors&rdquo; to play again with different celebrities.</li>
            </ol>
          </div>
          
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gray-900/70 rounded-lg border border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-cyan-300">Tips</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Look for actors with famous last names.</li>
              <li>Consider younger actors in major roles who might have had a &ldquo;fast track&rdquo; to success.</li>
              <li>Some nepo babies are obvious, but others might surprise you!</li>
            </ul>
          </div>
        </div>
        
        <Link
          href="/guessWhichActor"
          className="w-full sm:w-auto mt-2 sm:mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold rounded-lg hover:from-fuchsia-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-base sm:text-lg text-center"
          style={{
            boxShadow: '0 4px 10px rgba(217, 70, 239, 0.4)'
          }}
        >
          START PLAYING
        </Link>
      </main>
    </div>
  );
}
