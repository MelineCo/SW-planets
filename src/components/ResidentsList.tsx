import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ResidentRow } from "./ResidentRow";

interface ResidentsListProps {
    urls: string[];
}

const ResidentsList: React.FC<ResidentsListProps> = ({urls}) => {

    if (!urls.length) {
        return <p style={{ marginTop: 36, fontStyle: "italic", color: 'grey' }}>No residents found</p>
    }

    return <>
    <Table data-testid={'all-residents-list'}
        sx={{ mt: 5 }}>
      <TableHead>
        <TableRow>
            <TableCell
              component="th"
              scope="row"
            >
              Resident
            </TableCell>
          <TableCell
            component="th"
            scope="row"
          >
            Gender
          </TableCell>
          <TableCell
            component="th"
            scope="row"
          >
            Birth year
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>

        {urls.length > 0 && urls.map(resident => (
            <ResidentRow
              key={resident}
              url={resident}
            />
          ))}

      </TableBody>
    </Table>
  </>
}

export default ResidentsList;