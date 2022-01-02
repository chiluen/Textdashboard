import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { getpost } from '../../axios/Page_3_axios';

const columns = [
  { id: 'time', label: '時間', minWidth: 150 },
  { id: 'classification', label: '分類', minWidth: 80},
  { id: 'author', label: '作者', minWidth: 80 },
  { id: 'title', label: '標題', minWidth: 200},
];

const createData = (rowid, time, classification,author, title, content) =>{
  const ll = new Date(time)
  const new_time = ll.getFullYear() + "/" + (ll.getMonth()+1) + "/" + ll.getDate() + " " + ll.toTimeString().slice(0,8)
  time = new_time
  return {rowid, time, classification, author, title, content };
}

const Stickytable =(props) =>{
  const [page, setPage] = React.useState(props.nowpage);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setrows] = React.useState([createData('','', '','', "")]);
  const [finish, setfinish] = React.useState(false)
  

  React.useEffect( async()=>{
    
    const data = await getpost()
    let rowdata = []
    for(var i=0; i < Object.keys(data).length; i++){
      rowdata.push( createData(i, data[i]["time"], data[i]["classification"],data[i]["author"], data[i]["title"], data[i]["content"]) )
    }
    setrows(rowdata) 
  },[])
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container rowSpacing={5} columnSpacing={{ xs: 30, sm: 30, md: 30 }} > 
        <Grid item xs={12} >
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)   
                    .map((row, index) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} style={  (index%2) === 0 ? {backgroundColor:"#E8E8E4"}: {backgroundColor: "#FFD7BA"} }>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align} style={{fontFamily: "Helvetica Neue"}} onClick={()=>{props.func(page, row)}}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        </Grid>
    </Grid>
  );
}

export default Stickytable;
