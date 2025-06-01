"use client"

import Link from "next/link";
import { useActorsByIds } from "@/lib/hooks/useActors";
import { useState, useCallback } from "react";
import ActorButton from "./actorButton";
import { useActorCount } from "@/lib/hooks/useActorCount";

export default function GuessWhichActorPage() {
  
  // Get actor counts once when component loads
  const { data: actorCountData } = useActorCount();

  // Function to get random IDs
  const getRandomIds = useCallback(() => {
    if (actorCountData) {
      return {
        nepo: getRandomNumber(actorCountData.totalNepoCount),
        nonNepo: getRandomNumber(actorCountData.totalNonNepoCount)
      };
    }
    return { nepo: "1", nonNepo: "1" };
  }, [actorCountData]);

  // Initialize with random IDs
  const [nonNepoActorIds, setNonNepoActorIds] = useState<string[]>([]);
  const [nepoActorIds, setNepoActorIds] = useState<string[]>([]);
  // State for tracking if positions are swapped
  const [isSwapped, setIsSwapped] = useState(false);
  // State for tracking user's guess result
  const [guessResult, setGuessResult] = useState<{correct: boolean; message: string} | null>(null);
  
  // Set initial IDs if actor count data is available
  if (actorCountData && nonNepoActorIds.length === 0 && nepoActorIds.length === 0) {
    const ids = getRandomIds();
    setNonNepoActorIds([ids.nonNepo]);
    setNepoActorIds([ids.nepo]);
    setIsSwapped(Math.random() >= 0.5);
  }

  // Use the React Query hook to fetch actors by their IDs
  const { data: actors } = useActorsByIds(nonNepoActorIds, nepoActorIds);

  // Generate new random IDs on refresh
  const handleActorRefresh = () => {
    const ids = getRandomIds();
    setNonNepoActorIds([ids.nonNepo]);
    setNepoActorIds([ids.nepo]);
    setIsSwapped(Math.random() >= 0.5);
    setGuessResult(null);
  }
  
  // Handle user&apos;s guess
  const handleGuess = (isNepoBaby: boolean) => {
    if (!actors) return;
    
    // Get the first sentence of explanation to avoid scrolling
    const explanation = actors.nepoActors[0].explanation || '';
    const firstSentence = explanation.split('.')?.[0] || 'Famous family connections';
    
    if (isNepoBaby) {
      setGuessResult({
        correct: true,
        message: `Correct! ${actors.nepoActors[0].actorName} is a nepo baby. ${firstSentence}.`
      });
    } else {
      setGuessResult({
        correct: false,
        message: `Wrong! ${actors.nepoActors[0].actorName} is the nepo baby. ${firstSentence}.`
      });
    }
  }

  return (
    <div 
      className="min-h-screen p-4 font-sans bg-gray-900"
      style={{
        background: 'radial-gradient(circle at top left, #3a1a54, #111111), linear-gradient(to bottom right, #111111, #1c1c3d)'
      }}
    >
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-[15px] sm:gap-[12px] items-center py-6 sm:py-5 px-4 sm:px-8 bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700 shadow-2xl" 
        style={{
          boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 0, 128, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        <h1 
          className="text-4xl sm:text-4xl font-bold text-center tracking-tight" 
          style={{ 
            background: 'linear-gradient(90deg, #0ea5e9 0%, #d946ef 50%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 20px rgba(217, 70, 239, 0.5)'
          }}
        >
          NEPO BABY
        </h1>
        <p className="text-lg sm:text-lg font-semibold text-white text-center mb-2 sm:mb-2">Can you spot the Hollywood royalty?</p>

        <div className="flex flex-row gap-3 sm:gap-8 justify-center items-center w-full px-2 py-2">
          {actors && (
            isSwapped ? (
              <>
                {actors.nonNepoActors?.[0] && (
                  <ActorButton actor={actors.nonNepoActors[0]} isNepoBaby={false} onClick={handleGuess} />
                )}
                {actors.nepoActors?.[0] && (
                  <ActorButton actor={actors.nepoActors[0]} isNepoBaby={true} onClick={handleGuess} />
                )}
              </>
            ) : (
              <>
                {actors.nepoActors?.[0] && (
                  <ActorButton actor={actors.nepoActors[0]} isNepoBaby={true} onClick={handleGuess} />
                )}
                {actors.nonNepoActors?.[0] && (
                  <ActorButton actor={actors.nonNepoActors[0]} isNepoBaby={false} onClick={handleGuess} />
                )}
              </>
            )
          )}
        </div>
        
        {guessResult && (
          <div 
            className={`p-4 sm:p-3 mt-2 sm:mt-2 w-full sm:max-w-3xl rounded-lg ${guessResult.correct ? 'bg-emerald-900/70 border border-emerald-400' : 'bg-red-900/70 border border-red-400'}`}
            style={{
              boxShadow: `0 0 15px ${guessResult.correct ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
            }}
          >
            <p className={`text-base sm:text-base font-medium leading-relaxed ${guessResult.correct ? 'text-white' : 'text-white'}`}>
              {guessResult.correct ? '⭐ ' : '❌ '}
              {guessResult.message}
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4 sm:mt-3 w-full sm:w-auto">
          <button 
            onClick={handleActorRefresh}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-2 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-medium rounded-lg hover:from-fuchsia-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            style={{
              boxShadow: '0 4px 10px rgba(217, 70, 239, 0.4)'
            }}
          >
            New Actors
          </button>

          <Link 
            href="/" 
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-2 border border-gray-600 bg-gray-800 transition-colors flex items-center justify-center hover:bg-gray-700 font-medium text-cyan-300 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Instructions
          </Link>
        </div>
      </main>
    </div>
  );
}

function getRandomNumber(max: number): string {
  return String(Math.floor(Math.random() * max) + 1);
};