import React from 'react';

type ButtonSize = 'sm' | 'md' | 'lg' | '2lg' | '3lg';

type Props = {
  size?: ButtonSize;
};

export const Button: React.FC<Props> = ({ children, size = 'sm' }) => {
  // default : sm
  let classNameValue =
    'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  if (size === 'md') {
    classNameValue =
      'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  } else if (size === 'lg') {
    classNameValue =
      'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  } else if (size === '2lg') {
    classNameValue =
      'inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  } else if (size === '3lg') {
    classNameValue =
      'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  }

  return (
    <button type="button" className={classNameValue}>
      {children}
    </button>
  );
};
