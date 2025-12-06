import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useResolveRiddle } from './use-case/use-resolve-riddle';
import { ResolutionState } from './service/ResolveRiddleService';

export const RiddlePage = () => {
    const { id } = useParams<{ id: string }>();

    const {
        randomRiddleId,
        contentsHtml,
        answers,
        state,
        canPlayAgain,
        isRiddleLoading,
        handleClick,
    } = useResolveRiddle(id!);

    if (isRiddleLoading) return null;

    return (
        <main className="text-lg">
            {contentsHtml && (
                <p dangerouslySetInnerHTML={{ __html: contentsHtml }} className="mb-16" />
            )}
            <p className="mb-5">Possible answers:</p>
            <ul>
                {answers.map((answer) => (
                    <li
                        key={answer.id}
                        onClick={() => handleClick(answer.id)}
                        className={classNames('border py-2 pl-3 pr-2 my-1', {
                            'cursor-pointer': answer.isClickable,
                            'border-blue-500': state === ResolutionState.Undefined,
                            "border-green-700 text-green-900 before:content-['✓']":
                                answer.isCorrectSelected,
                            "border-red-700 text-red-800  before:content-['✗']":
                                answer.isWrongSelected,
                        })}
                    >
                        <span className="pl-2">{answer.text}</span>
                    </li>
                ))}
            </ul>
            {state === ResolutionState.Correct && (
                <div className="bg-green-400 my-6 p-3">
                    {"Great job! You're right 🙏"}
                </div>
            )}
            {state === ResolutionState.Wrong && (
                <div className="bg-red-300 my-6 p-3">
                    {'This time your answer is wrong.'}
                </div>
            )}
            {canPlayAgain && randomRiddleId && (
                <div className="mt-5">
                    <Link
                        to={`/riddle/${randomRiddleId}`}
                        reloadDocument
                        className="underline"
                    >
                        Play one more
                    </Link>
                </div>
            )}
        </main>
    );
};
