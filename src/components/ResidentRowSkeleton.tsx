import { FC } from 'react';
import { Box, Skeleton, TableCell, TableRow } from '@mui/material';

export const ResidentRowSkeleton: FC = () => (
  <TableRow key={'1'}>
    <TableCell>
      <Box display="flex" alignItems="flex-start">
        <Skeleton variant={'text'} width="100%" height={32} />
      </Box>
    </TableCell>
    <TableCell>
      <Box display="flex" alignItems="flex-start">
        <Skeleton variant={'text'} width="100%" height={32} />
      </Box>
    </TableCell>
    <TableCell>
      <Box display="flex" alignItems="flex-start">
        <Skeleton variant={'text'} width="100%" height={32} />
      </Box>
    </TableCell>
  </TableRow>
);
