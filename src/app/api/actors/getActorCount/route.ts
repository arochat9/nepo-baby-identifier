import { NextResponse } from 'next/server';
import { NepoBabyActor } from "@service-user-for-actor-apps/sdk";
import { client } from '@/lib/server/foundry/client';

export async function GET() {
    const countNepoPromise = client(NepoBabyActor)
    .where({
        nepoBaby: {$eq: true}
    })
    .aggregate({
        $select: {$count: "unordered"},
    }).then(item => item.$count)

    const countNonNepoPromise = client(NepoBabyActor)
    .where({
        nepoBaby: {$eq: false}
    })
    .aggregate({
        $select: {$count: "unordered"},
    }).then(item => item.$count)
  
    const [countNepo, countNonNepo] = await Promise.all([countNepoPromise, countNonNepoPromise]);
    const count = countNepo + countNonNepo;
    return NextResponse.json({
        "totalActorCount": count,
        "totalNepoCount": countNepo,
        "totalNonNepoCount": countNonNepo
    });
}