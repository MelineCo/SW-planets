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
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const { resident, isPending, error } = useGetResident( url );

    const residentRow = (
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

    const modalResident = (
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', width: 200, transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          {resident && (
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

        {!isPending && !error && resident && (
          <>
            {residentRow}
            {modalResident}
          </>
        )}
      </>
      
    )
  };
