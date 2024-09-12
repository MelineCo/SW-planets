import { Outlet } from "react-router-dom";
import { useGetPlanets } from "../hooks/useGetPlanets";
import Planet from "./Planet";
import { Skeleton, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { pictures } from '../assets/data';
import { Planet as PlanetType } from '../types/planets';
import { useNavigate } from "react-router-dom";
import { ContextType } from '../types/context';

const PlanetsList: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/planets")
    } 

    const { data, isPending, error } = useGetPlanets();

    if (isPending) return <Skeleton data-testid="skeleton" animation="wave" variant="rectangular" width={210} height={118} />;
    if (error) return <p>Error: {error.message}</p>;

    if (!data.results.length) {
        return <p>No results</p>
    }

    const planetsWithPictures = data.results.map(planet => {
        const matchedPicture = pictures.find((picture)=> picture.name === planet.name);
        const p: PlanetType = {
            ...planet,
            picture: matchedPicture?.picture
          }
        return p;
      });


    const planetsList = planetsWithPictures.map((planet) => {
        return (
            <div key={planet.url} style={{ height: `300px` }}>
                <Planet planet={planet} />
            </div>
        );
    })

    return (
        <>
            <Typography variant="h3" component="div" sx={{ mb: 5, mt: 5 }}>Planet list</Typography>
            <Masonry columns={3} spacing={8}>
                {planetsList}
            </Masonry>
            <Outlet context={{handleGoBack} satisfies ContextType}/>
        </>
    )
}

export default PlanetsList;