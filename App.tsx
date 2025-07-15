
import React, { useState, useEffect, useCallback } from 'react';
import type { PhraseData } from './types';
import { fetchPhrase } from './services/geminiService';
import { PhraseCard } from './components/PhraseCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { SparklesIcon, ArrowPathIcon } from './components/Icons';

const App: React.FC = () => {
  const [phraseData, setPhraseData] = useState<PhraseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNewPhrase = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPhrase();
      setPhraseData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setPhraseData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getNewPhrase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <SparklesIcon className="w-8 h-8 text-indigo-500" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              English Phrase of the Day
            </h1>
          </div>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Learn a new idiom or phrasal verb with just one click.
          </p>
        </header>

        <div className="w-full min-h-[350px] flex items-center justify-center">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={getNewPhrase} />}
          {!isLoading && !error && phraseData && <PhraseCard data={phraseData} />}
        </div>

        <div className="mt-8">
          <button
            onClick={getNewPhrase}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Generating...' : 'Next Phrase'}</span>
          </button>
        </div>
      </main>

      <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} English Phrase of the Day. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
