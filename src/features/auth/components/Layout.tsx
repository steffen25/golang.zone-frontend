import * as React from 'react';
import { Head } from '@/components/Head';

type LayoutProps = {
    children: React.ReactNode;
    title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
    return (
        <>
            <Head title={ title } />

            <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{ title }</h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{ children }</div>
                </div>
            </div>
        </>
    );
};