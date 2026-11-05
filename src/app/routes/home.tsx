import { MainLayout } from '@/components/layouts/main-layout';
import { Counter } from '@/features/counter/components/counter';

export const HomeRoute = () => {
  return (
    <MainLayout title="React Template">
      <p>Minimal Bulletproof React starter template.</p>
      <Counter />
    </MainLayout>
  );
};

export default HomeRoute;
