import { useEffect, useState } from 'react';
import Loader from './Component/Loader';
import TableComponent from './Component/Table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Graph from './Component/Graph/Graph';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

      <div className='bg-[#222831] min-h-screen'>
        {isLoading ? (
          <Loader />
        ) : <>
          <div className='container'>
            <TableComponent />
            <Graph />
          </div>
        </>
        }
      </div>

    </QueryClientProvider>
  );
}

export default App;
