
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">Oops! Something went wrong.</h3>
      <p className="mt-2 text-red-600 dark:text-red-400">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Try Again
      </button>
    </div>
  );
};
