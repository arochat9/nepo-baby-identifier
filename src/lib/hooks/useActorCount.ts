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
  
  // Format the data consistently for both the hook and the prefetch
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
    staleTime: 1440 * 60 * 1000, // Consider data stale after 5 minutes
    gcTime: Infinity,         // Never garbage collect the data
    refetchOnMount: false,    // Use cached data if available
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: false,   // Don't refetch on reconnect
    ...options
  });
}
