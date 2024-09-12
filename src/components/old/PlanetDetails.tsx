import { useGetPlanet } from '../../hooks/useGetPlanet';
import { useParams } from "react-router-dom";
import Planet from '../Planet';
import Typography from '@mui/material/Typography';

const PlanetDetails: React.FC = () => {
    const { id } = useParams();

    const { planet, isPending, error } = useGetPlanet(id);

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!planet) {
        return <p>Planet not found</p>
    }

    return (
        <Planet planet={planet}>
            <Typography variant="body1">
                Orbital period: {planet.orbital_period}
            </Typography>
            <Typography variant="body1">
                Diameter: {planet.diameter}
            </Typography>
        </Planet>
    )
}

export default PlanetDetails;