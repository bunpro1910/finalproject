'use client'
import { useState, useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Edit } from '@mui/icons-material';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import EnhancedTableHead from '../ui/TableHeader';
import EnhancedTableToolbar from '../ui/TableToolBar';

import ProductService from '@/services/ProductService';
import OrderService from '@/services/OrderService';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },

    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'Image',
    },
    {
        id: 'quantity',
        numeric: false,
        disablePadding: true,
        label: 'Quantity',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: true,
        label: 'Price',
    },
  
    {
        id: 'total',
        numeric: false,
        disablePadding: true,
        label: 'Total',
    },
   
   
];




export default function CartTable({id}) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('faculty');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([])
    const[ cart ,setCart ] = useState()
    const [rowsPerPage, setRowsPerPage] = useState(10);
   
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    useEffect(() => {
        OrderService.getOrderById(id).then(x => {
            setCart(x.data?.orderItems)
            console.log(x.data)
            setData(stableSort(x.data.orderItems, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ))

        }).catch(e => console.log(e))

    }, [order, orderBy, page, rowsPerPage, selected])
    
    return (
        <div className='w-3/5 mx-auto my-24'>
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
          
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data?.length || 0}
                            headCells={headCells}
                        />
                        <TableBody>
                            {data && data.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.product.name}
                                        </TableCell>
                                        <TableCell align="left"><img src={`/${row.product.image}`} className='max-w-[200px]' alt="" /></TableCell>
                                        <TableCell align="left">{row.quantity}</TableCell>
                                        <TableCell align="left">{row.product.price}</TableCell>
                                        <TableCell align="left">{row.quantity*row.product.price}</TableCell>
                                       
                                        
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={cart?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
        </div>
    );
}