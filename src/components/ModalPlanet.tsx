import { FC } from 'react';
import { useGetPlanet } from '../hooks/useGetPlanet';
import { useParams, useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Drawer,
    Stack,
    Typography
} from '@mui/material';
import { ModalPlanetSkeleton } from './ModalPlanetSkeleton';

const ModalPlanet: FC = () => {
    const { planetId } = useParams();
    const navigate = useNavigate();

    const { planet, isPending, error } = useGetPlanet(planetId);

    if (!planet && !isPending) {
        return <p>Planet not found</p>
    }

    const DrawerHeader = (
        <Box
            display="flex"
            alignItems="center"
            marginBottom={6}
        >
            <Typography variant="h5">Détails de la planète</Typography>
            <Box
                display="flex"
                marginLeft="auto"
            >
                <Button
                    variant={'outlined'}
                    color="info"
                    onClick={() => navigate(-1)}
                >
                    Fermer
                </Button>
            </Box>
        </Box>
    )

    const DrawerList = (
        <Stack spacing={4}>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Planet:</Typography>
                <Typography>{planet?.name}</Typography>
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Climate:</Typography>
                <Typography>{planet?.climate}</Typography>
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Population:</Typography>
                <Typography>{planet?.population}</Typography>
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Orbital period:</Typography>
                <Typography>{planet?.orbital_period}</Typography>
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Diameter:</Typography>
                <Typography>
                    {planet?.diameter}
                </Typography>
            </Stack>
        </Stack>
    )

    return (
        <Drawer
            open={true}
            anchor="right"
            PaperProps={{
                sx: {
                    width: '30%',
                    backgroundColor: "#FAFAFA",
                    padding: 3,
                },
            }}
        >
            {DrawerHeader}

            {isPending && !error && <ModalPlanetSkeleton />}

            {!isPending && error && (
                <Box data-testid="tickets-error">
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                </Box>
            )}

            {!isPending && !error && planet && DrawerList}
        </Drawer>
    )
}

export default ModalPlanet;