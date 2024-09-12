import { FC } from 'react';

import { Skeleton, Stack, Typography } from '@mui/material';

export const ModalPlanetSkeleton: FC = () => (
        <Stack spacing={4}>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Planet:</Typography>
                <Skeleton
                    data-testid="skeleton" 
                    width={100}
                    height={30}
                />
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Climate:</Typography>
                <Skeleton
                    data-testid="skeleton" 
                    width={100}
                    height={30}
                />
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Population:</Typography>
                <Skeleton
                    data-testid="skeleton" 
                    width={100}
                    height={30}
                />
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Orbital period:</Typography>
                <Skeleton
                    data-testid="skeleton" 
                    width={100}
                    height={30}
                />
            </Stack>
            <Stack
                spacing={2}
                direction="row"
            >
                <Typography>Diameter:</Typography>
                <Skeleton
                    data-testid="skeleton" 
                    width={100}
                    height={30}
                />
            </Stack>
        </Stack>
);
