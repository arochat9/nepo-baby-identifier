import { useQuery } from '@tanstack/react-query';
import { Osdk } from '@osdk/client';
import { NepoBabyActor } from "@service-user-for-actor-apps/sdk";


/**
 * Fetch actors by their IDs
 */

interface IActorLists {
  "nonNepoActors": Osdk.Instance<NepoBabyActor>[],
  "nepoActors": Osdk.Instance<NepoBabyActor>[]
}

async function fetchActorsByIds(nonNepoActorIds: string[], nepoActorIds: string[]): Promise<IActorLists> {
  const response = await fetch('/api/actors/listActors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nonNepoActorIds: nonNepoActorIds,
      nepoActorIds: nepoActorIds
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch actors');
  }
  
  const data = await response.json();
  return data;
}

/**
 * React Query hook for fetching actors by IDs
 */
export function useActorsByIds(nonNepoActorIds: string[], nepoActorIds: string[]) {
  return useQuery({
    queryKey: ['actors', 'byIds', { nonNepoActorIds, nepoActorIds }],
    queryFn: () => fetchActorsByIds(nonNepoActorIds, nepoActorIds),
    enabled: nonNepoActorIds.length > 0 || nepoActorIds.length > 0 // Only run the query if there are actor IDs
  });
}
