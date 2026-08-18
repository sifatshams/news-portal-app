import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <AppRoutes />
      {/* toaster */}
      <Toaster position="top-center" />
    </>
  );
};

export default App;
