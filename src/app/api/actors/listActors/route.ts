import { NextResponse } from 'next/server';
import { NepoBabyActor } from "@service-user-for-actor-apps/sdk";
import { client } from '@/lib/server/foundry/client';
import { NextRequest } from 'next/server';
import { Osdk } from '@osdk/client';

/**
 * POST endpoint that accepts actorIds in the request body
 * Request body format: { actorIds: string[] }
 */
export async function POST(request: NextRequest) {
  // Parse actorIds from the request body
  const body = await request.json();
  const nonNepoActorIds = body.nonNepoActorIds ?? [];
  const nepoActorIds = body.nepoActorIds ?? [];
  
  const nonNepoActorsOS = client(NepoBabyActor).where({
    nepoBaby: { $eq: false },
    nepoBabyRowNumber: { $in: nonNepoActorIds }
  }).fetchPage({ $pageSize: 30 });

  const nepoActorsOS = client(NepoBabyActor).where({
    nepoBaby: { $eq: true },
    nepoBabyRowNumber: { $in: nepoActorIds }
  }).fetchPage({ $pageSize: 30 });

  const [nonNepoActors, nepoActors]: [Osdk.Instance<NepoBabyActor>[], Osdk.Instance<NepoBabyActor>[]] = await Promise.all([
    (await nonNepoActorsOS).data, (await nepoActorsOS).data
  ]);
  
  return NextResponse.json({
    "nonNepoActors": nonNepoActors,
    "nepoActors": nepoActors
  });
} 