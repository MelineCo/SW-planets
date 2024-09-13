import { FC } from 'react';
import { useGetPlanet } from '../hooks/useGetPlanet';
import { useParams } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Drawer,
    Stack,
    Typography
} from '@mui/material';
import { ModalPlanetSkeleton } from './ModalPlanetSkeleton';
import { useOutletContext } from 'react-router-dom';
import { ContextType } from '../types/context';
import ResidentsList from './ResidentsList';

const ModalPlanet: FC = () => {
    const { planetId } = useParams();
    const { handleGoBack } = useOutletContext<ContextType>();

    const { planet, isPending, error } = useGetPlanet(planetId);

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
                    data-testid="close-button"
                    variant={'outlined'}
                    color="info"
                    onClick={() => handleGoBack()}
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

            {isPending && !error && <ModalPlanetSkeleton/>}

            {!isPending && error && (
                <Box data-testid="planets-error">
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                </Box>
            )}

            {!isPending && !error && planet && DrawerList}
            {!isPending && !error && planet && <ResidentsList urls={planet.residents} />}

            {!planet && !isPending && <p>Planet not found</p>}

        </Drawer>
    )
}

export default ModalPlanet;