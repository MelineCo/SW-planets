import { Outlet } from "react-router-dom";
import { useGetPlanets } from "../hooks/useGetPlanets";
import Planet from "./Planet";
import { Skeleton } from '@mui/material';

const PlanetsList: React.FC = () => {

    const { data, isPending, error } = useGetPlanets();

    if (isPending) return <Skeleton data-testid="skeleton" animation="wave" variant="rectangular" width={210} height={118} />;
    if (error) return <p>Error: {error.message}</p>;

    if (!data.results.length) {
        return <p>No results</p>
    }

    const planetsList = data.results.map((planet) => {
        return (
                <Planet key={planet.url} planet={planet} />
        )
    })

    return (
        <>
            {planetsList}
            <Outlet />
        </>
    )
}

export default PlanetsList;