import { Osdk } from '@osdk/client';
import { NepoBabyActor } from "@service-user-for-actor-apps/sdk";

interface ActorButtonProps {
    actor: Osdk.Instance<NepoBabyActor>;
    isNepoBaby?: boolean;
    onClick?: (isNepoBaby: boolean) => void;
}

export default function ActorButton({ actor, isNepoBaby, onClick }: ActorButtonProps) {
    return (
        <button 
            className="p-5 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            style={{
                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                border: '2px solid #333',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 64, 0, 0.3), inset 0 0 15px rgba(255, 128, 0, 0.1)',
            }}
            onClick={() => onClick?.(isNepoBaby || false)}
        >
            <div className="font-bold text-xl text-fuchsia-300 mb-3" style={{ textShadow: '0 0 8px rgba(217, 70, 239, 0.6)' }}>{actor.actorName}</div>
            <div className="relative overflow-hidden rounded-md ring-2 ring-cyan-500 ring-offset-2 ring-offset-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-cyan-900/30 mix-blend-overlay z-10"></div>
                <img 
                    src={actor.smallProfileUrl} 
                    alt="" 
                    className="mx-auto w-56 h-64 object-cover" 
                    style={{
                        filter: 'saturate(120%) contrast(110%) brightness(110%)'
                    }}
                />
            </div>
            <p className='break-words max-w-[220px] text-sm mt-3 text-emerald-300'>
                Known for: <span className="font-medium text-cyan-300">{actor.knownFor?.map(knownFor => knownFor.name).join(", ")}</span>
            </p>
        </button>
    );
}