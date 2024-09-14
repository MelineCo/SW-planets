import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import PlanetDetails from "./components/PlanetDetails";
import ModalPlanet from './components/ModalPlanet.tsx';
import PlanetsList from './components/PlanetsList.tsx';

// import {useNavigate } from 'react-router-dom';

//  const PlanetDetailsModule:FC = () => {

//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     navigate('/planets');
//   }

//   return (
//     <ModalPlanet handleGoBack={handleGoBack}/>
//   )
// }

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "planets",
    element: <PlanetsList />,
    children: [
      {
        path: ":planetId",
        element: <ModalPlanet />,
      }
    ]
  },
  // {
  //   path: "planets/:id", 
  //   element: <PlanetDetails /> 
  // }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
