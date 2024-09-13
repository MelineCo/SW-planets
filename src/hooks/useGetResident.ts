import { useQuery } from '@tanstack/react-query';
import { Resident } from '../types/residents';

const fetchResident = async (url: string): Promise<Resident> => {
  const response = await fetch(`${url}`);
  return response.json();
};

export const useGetResident = (url: string | undefined) => {
    if(!url){
      return { resident: undefined, isPending: false, error: null};
    }

    const { data, isPending, error } = useQuery<Resident>({
        queryKey: ['residents', url],
        queryFn: () => fetchResident(url),
        enabled: !! url,
      });
    return { resident: data, isPending, error } 
}

