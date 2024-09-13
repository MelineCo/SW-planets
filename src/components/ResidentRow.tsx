import { FC } from 'react';
import { Link, Box, Alert, TableCell, TableRow } from '@mui/material';
import { useGetResident } from '../hooks/useGetResident';
import { ResidentRowSkeleton } from './ResidentRowSkeleton';


interface ResidentRowProps {
  url: string;
}

export const ResidentRow: FC<ResidentRowProps> = ({ url }) => {

    const { resident, isPending, error } = useGetResident( url );

    console.log(resident)

    const found = (
      <TableRow
        key={resident?.name}
        hover
        onClick={() => {}}
      >
        <TableCell
          component="td"
          scope="row"
          width="50%"
        >
          {resident?.name}
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          width="25%"
        >
          {resident?.gender}
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          width="25%"
        >
          {resident?.birth_year}
        </TableCell>
      </TableRow>
    )

    const notFound = (
      <TableRow
        key={resident?.name}
        hover
        onClick={() => {}}
      >
        <TableCell
          component="td"
          scope="row"
          width="25%"
        >
          -
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          width="25%"
        >
          -
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          width="25%"
        >
          -
        </TableCell>
      </TableRow>
    )

    return (
      <>
        {isPending && !error && <ResidentRowSkeleton/>}

        {!isPending && error && (
            <Box data-testid="resident-error">
                <Alert severity="error">
                    {error.message}
                </Alert>
            </Box>
        )}

        {!isPending && !error && resident && found}

        {!resident && !isPending && notFound}
      </>
      
    )
  };
