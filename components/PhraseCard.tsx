
import React from 'react';
import type { PhraseData } from '../types';
import { BookOpenIcon, ChatBubbleLeftRightIcon } from './Icons';

interface PhraseCardProps {
  data: PhraseData;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({ data }) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 dark:border-slate-700 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight">
          {data.phrase}
        </h2>
      </div>

      <div className="mb-6 space-y-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
          <BookOpenIcon className="w-5 h-5" />
          <span>Meaning</span>
        </h3>
        <p className="text-slate-600 dark:text-slate-400 pl-7">{data.meaning}</p>
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span>Examples</span>
        </h3>
        <ul className="list-none pl-7 space-y-2">
          {data.examples.map((example, index) => (
            <li key={index} className="relative pl-4 text-slate-600 dark:text-slate-400">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                "{example}"
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
