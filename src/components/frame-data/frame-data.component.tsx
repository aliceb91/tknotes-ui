import styles from './frame-data.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MoveData } from '../character-page/character-page.component';

interface FrameData {
  move: MoveData | null;
}

export function FrameData(props: FrameData) {

  const rows = props.move ? [props.move] : [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Input</TableCell>
            <TableCell align="right">Hit Level</TableCell>
            <TableCell align="right">Damage</TableCell>
            <TableCell align="right">Start Up</TableCell>
            <TableCell align="right">Block</TableCell>
            <TableCell align="right">Hit</TableCell>
            <TableCell align="right">Counter</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.command}
              </TableCell>
              <TableCell align="right">{row.hitLevel}</TableCell>
              <TableCell align="right">{row.damage}</TableCell>
              <TableCell align="right">{row.startUpFrame}</TableCell>
              <TableCell align="right">{row.blockFrame}</TableCell>
              <TableCell align="right">{row.hitFrame}</TableCell>
              <TableCell align="right">{row.counterHitFrame}</TableCell>
              <TableCell align="right">{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}