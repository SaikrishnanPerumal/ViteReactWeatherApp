import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashBoard from './Pages/DashBoard'
import { CitiesContextProvider } from './Hooks/useCitesContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount) => failureCount <= 2,
      staleTime: 60 * 1000
    }
  }
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CitiesContextProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path='/dashboard' element={<DashBoard />}/>
              <Route path='/' element={<h3>This route is not defined</h3>}/>
            </Routes>
          </BrowserRouter>
          </CitiesContextProvider>
        </QueryClientProvider>
    </>
  )
}

export default App
