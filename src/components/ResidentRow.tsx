import { FC } from 'react';
import { Box, Alert, TableCell, TableRow, Modal, Typography, Button } from '@mui/material';
import { useGetResident } from '../hooks/useGetResident';
import { ResidentRowSkeleton } from './ResidentRowSkeleton';
import { useState } from 'react';

interface ResidentRowProps {
  url: string;
}

export const ResidentRow: FC<ResidentRowProps> = ({ url }) => {
    const [open, setOpen] = useState(false);
    
    const handleRowClick = () => {
      console.log('Row clicked!');
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const { resident, isPending, error } = useGetResident( url );

    const found = (
      <TableRow
        key={resident?.name}
        hover
        onClick={handleRowClick}
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

    const modalResident = (
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', width: 200, transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          {resident ? (
            <div>
              <Typography variant="h6">Resident details</Typography>
              <Typography>Name : {resident.name}</Typography>
              <Typography>Gender : {resident.gender}</Typography>
              <Typography>Birth year : {resident.birth_year}</Typography>
              <Typography>Height : {resident.height}</Typography>
              <Typography>Mass : {resident.mass}</Typography>
              <Typography>Hair color : {resident.hair_color}</Typography>
              <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
                Fermer
              </Button>
            </div>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>
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

        {modalResident}
      </>
      
    )
  };
