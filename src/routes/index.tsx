import { lazyImport } from '@/utils/lazyImport';

const { Routes } = lazyImport(() => import('./Routes'), 'Routes');

export const AppRoutes = () => {
    return <Routes />;
};