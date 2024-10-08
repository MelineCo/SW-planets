import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from "react-router-dom";

import { Planet as PlanetType } from '../types/planets';
import { PropsWithChildren } from 'react';

interface PlanetProps extends PropsWithChildren {
    planet: PlanetType
}

const Planet: React.FC<PlanetProps> = ({ planet, children }) => {

    const planetId = planet.url.replace("https://swapi.dev/api/planets/", "");

    return (
        <Link to={`/planets/${planetId}`}>
            <Card sx={{
                minWidth: 275, 
                height: 300,
             }}>
                <CardMedia
                    component="img"
                    sx={{ height: 190 }}
                    image={planet.picture}
                    title= {`Planet ${planet.name}`}
                    alt= {`${planet.name} picture`}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Planet: {planet.name}
                    </Typography>
                    <Typography variant="body1">
                        Climate: {planet.climate}
                    </Typography>
                    <Typography variant="body1">
                        Population: {planet.population}
                    </Typography>
                    {children}
                </CardContent>
            </Card>
        </Link>
    )
}

export default Planet;