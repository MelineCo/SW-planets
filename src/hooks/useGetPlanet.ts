import { useQuery } from '@tanstack/react-query';
import { Planet } from '../types/planets';

const fetchPlanet = async (url: string): Promise<any> => {
  const response = await fetch(`${url}`);
  return response.json();
};

export const useGetPlanet = (planetId: string | undefined) => {

  if(!planetId){
    return { planet: undefined, isPending: false, error: null};
  }

  const { data, isPending, error } = useQuery<Planet>({
    queryKey: ['planets', planetId],
    queryFn: () => fetchPlanet(`https://swapi.dev/api/planets/${planetId}`),
    enabled: !!planetId,
  });

  return { planet: data, isPending, error}
}
