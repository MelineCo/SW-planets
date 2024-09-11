import { useQuery } from '@tanstack/react-query';
import { Planet } from '../types/planets';

type Planets = {
    results: Planet[]
}

const fetchPlanetList = async (): Promise<Planets> => {
    const response = await fetch('https://swapi.dev/api/planets');
    return response.json();
  };

export const useGetPlanets = () => {
    return useQuery<Planets>({
        queryKey: ['planets'],
        queryFn: fetchPlanetList,  
      });
}
