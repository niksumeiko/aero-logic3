import { Link, useSearchParams } from 'react-router-dom';
import { useRandomRiddle } from './use-case/use-random-riddle';

export const LandingPage = () => {
    const [params] = useSearchParams();
    const { id, workInterval, timestamp } = useRandomRiddle();

    if (!params.get('tokenId')) {
        return null;
    }

    return (
        <main className="text-lg">
            <div>
                <p>
                    Work Interval: <span data-test="work-interval">{workInterval}</span>
                </p>
                <p>
                    Timestamp: <span data-test="timestamp">{timestamp}</span>
                </p>
                <div className="p-20 text-center">
                    {id && (
                        <Link
                            data-test="random-riddle-control"
                            to={`/riddle/${id}`}
                            className="p-5 border border-blue-500"
                        >
                            Resolve a random riddle
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};
