import * as React from 'react';

import { Head } from '../Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  title?: string | null;
};

export const ContentLayout = ({ children, title = null }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title ? title : ''} />
      <div className="py-6">
        {title ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
        ) : (
          ''
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </>
  );
};
