import { Table as MuiTable, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { IconButton, TableBody } from '@mui/material';
import React, { useState } from 'react';
import Controls from '../Controls/index';
import { categories } from './tableDB';

export default function Table(props) {
  const { setState, state } = props;
  const [error, setError] = useState(false);

  const handleInputs = (index, event) => {
    const value = state.table;
    value[index][event.target.name] = event.target.value;
    setState({
      ...state,
      table: value,
    });
  };

  const handleRemoveTableRow = (index) => {
    const values = state.table;
    values.splice(index, 1);
    setState({
      ...state,
      table: values,
    });
  };

  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {categories.map((headText) => (
            <TableCell align="left">{headText.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {state.table.map((row, index) => {
          return (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Controls.AutoCompleteInput name={'name'} value={row.name} />
              </TableCell>
              <TableCell>
                <Controls.Input
                  name={'count'}
                  value={row.count}
                  onChange={(e) => handleInputs(index, e)}
                />
              </TableCell>
              <TableCell>
                <Controls.Select
                  name={'kg'}
                  value={row.scale}
                  onChange={(e) => handleInputs(index, e)}
                  options={[{ id: 1, title: 'kg' }]}
                />
              </TableCell>
              <TableCell>
                <Controls.Input
                  name={'price'}
                  value={row.price}
                  onChange={(e) => handleInputs(index, e)}
                />
              </TableCell>
              <TableCell>
                <Controls.Input
                  name={'fullPrice'}
                  value={row.fullPrice}
                  onChange={(e) => handleInputs(index, e)}
                />
              </TableCell>
              <TableCell>
                <Controls.Input
                  name={'retailPrice'}
                  value={row.retailPrice}
                  onChange={(e) => handleInputs(index, e)}
                />
              </TableCell>
              <TableCell>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <DeleteSweepIcon onClick={() => handleRemoveTableRow(index)} />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
}
