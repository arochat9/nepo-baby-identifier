import { useQuery } from '@tanstack/react-query';

/**
 * Fetch the total count of actors
 */
interface IActorCounts {
  "totalCount": number,
  "totalNepoCount": number,
  "totalNonNepoCount": number
}

export async function fetchActorCount(): Promise<IActorCounts> {
  const response = await fetch('/api/actors/getActorCount');
  
  if (!response.ok) {
    throw new Error('Failed to fetch actor count');
  }
  
  const data = await response.json();
  return {
    totalCount: data.totalActorCount,
    totalNepoCount: data.totalNepoCount,
    totalNonNepoCount: data.totalNonNepoCount
  }
}

/**
 * React Query hook for getting actor count
 * @param options Optional query options that can be passed to override defaults
 */
export function useActorCount(options = {}) {
  return useQuery({
    queryKey: ['actors', 'count'],
    queryFn: fetchActorCount,
    staleTime: 0,        // Consider data stale immediately
    gcTime: Infinity,    // Still never garbage collect the data
    refetchOnMount: true, // Refetch when mounted (page reload)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: false,   // Don't refetch on reconnect
    ...options
  });
}
