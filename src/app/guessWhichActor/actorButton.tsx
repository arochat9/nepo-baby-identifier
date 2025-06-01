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
            className="p-3 sm:p-5 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex-1 min-w-[130px] max-w-[48%] sm:max-w-[300px]"
            style={{
                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                border: '2px solid #333',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 64, 0, 0.3), inset 0 0 15px rgba(255, 128, 0, 0.1)',
            }}
            onClick={() => onClick?.(isNepoBaby === true)}
        >
            <div className="font-bold text-sm sm:text-xl text-white mb-1 sm:mb-3 line-clamp-1 sm:line-clamp-2">{actor.actorName}</div>
            <div className="relative overflow-hidden rounded-md ring-2 ring-cyan-500 ring-offset-1 sm:ring-offset-2 ring-offset-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-cyan-900/30 mix-blend-overlay z-10"></div>
                <img 
                    src={actor.smallProfileUrl} 
                    alt="" 
                    className="mx-auto w-full h-auto aspect-[2/3] object-cover" 
                    style={{
                        filter: 'saturate(120%) contrast(110%) brightness(110%)'
                    }}
                />
            </div>
            <p className='break-words text-xs sm:text-sm mt-1 sm:mt-3 text-gray-200 font-medium line-clamp-1 sm:line-clamp-2'>
                <span className="font-medium text-white line-clamp-1">{actor.knownFor?.[0]?.name || ""}</span>
            </p>
        </button>
    );
}