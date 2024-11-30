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
import instance from '@/data/Instance';
import UserService from '@/services/UserService';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import EnhancedTableHead from '../ui/TableHeader';
import EnhancedTableToolbar from '../ui/TableToolBar';


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
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
    },
    {
        id: 'fullname',
        numeric: false,
        disablePadding: false,
        label: 'Full name',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'edit',
        numeric: true,
        disablePadding: false,
        label: 'Edit',
    }
];




export default function UserTable() {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('email');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([])
    const[user,setUser] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleDelete = (e) => {
        e.preventDefault();

        confirmAlert({
            title: `Confirm delete ${selected.length} Item`,
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const promises = selected.map(row => UserService.deleteUser(row));
                        Promise.all(promises)
                            .then(results => {
                                toast.success('Delete Success')
                                setSelected([])
                            })
                            .catch(error => {
                                toast.error('Delete Failed')
                                // Handle error appropriately
                            });
                    }
                },
                {
                    label: 'No',

                }
            ],
            overlayClassName: 'overlay-confirm'
        });
    };

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
        UserService.getUser().then(x => {
            setUser(x.data)
            setData(stableSort(x.data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ))

        }).catch(e => console.log(e))

    }, [order, orderBy, page, rowsPerPage,selected])

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete} />
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
                                            {row.email}
                                        </TableCell>

                                        <TableCell align="left">{row.fullName}</TableCell>
                                        <TableCell align="left">{row.role.name}</TableCell>
                                        <TableCell align="right"><Link href={`/admin/user/update/${row.id}`} className='bg-blue-400 rounded-md p-2 text-white mr-2'><Edit /></Link></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={user?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}