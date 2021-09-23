import React from 'react';

type Props = {
  title: string;
  html: string;
  className?: string;
};

export const PageTextHTMLSection: React.VFC<Props> = ({ title, html }) => {
  return (
    <section className="prose">
      <h2 className="text-xl leading-8 font-semibold text-black">{title}</h2>
      <div
        className="text-base leading-7 font-normal text-gray-500"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </section>
  );
};
