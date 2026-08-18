import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
