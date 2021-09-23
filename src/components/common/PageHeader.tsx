import React from 'react';

type Props = {
  title: string;
};

export const PageHeader: React.VFC<Props> = ({ title }) => {
  return (
    <header>
      <h1 className="text-3xl font-bold leading-tight text-gray-900 py-10">
        {title}
      </h1>
    </header>
  );
};
