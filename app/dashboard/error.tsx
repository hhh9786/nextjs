'use client';

const Page = ({
    error,
    reset
}: {
    error: Error;
    reset: () => void;
}) => {
    return (
        <div>
            <h1>Something went wrong</h1>
            <button onClick={reset}>Try again</button>
        </div>
    );
}

export default Page;    