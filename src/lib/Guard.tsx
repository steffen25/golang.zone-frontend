import * as React from 'react';

type GuardProps = { children: React.ReactNode; } & ({ shouldShow: boolean; });

export const Guard = ({ shouldShow, children }: GuardProps) => {
    return <>{shouldShow ? children : null}</>;
};
