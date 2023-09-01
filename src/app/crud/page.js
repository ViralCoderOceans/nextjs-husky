"use client";

import React, { useEffect, useState } from "react";
import {
  createOrUpdateUser,
  deleteUser,
  getAllUser,
} from "../../../services/actions";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { message } from "antd";

const columns = [
  { id: "userId", label: "Id", minWidth: 170 },
  { id: "firstName", label: "First Name", minWidth: 100 },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: (value) => {
      const date = new Date(value);
      const options = {
        dateStyle: "short",
        timeStyle: "short",
      };
      const formattedDateTime = date.toLocaleString(undefined, options);
      return formattedDateTime;
    },
  },
  {
    id: "updatedAt",
    label: "Updated At",
    minWidth: 170,
    align: "right",
    format: (value) => {
      const date = new Date(value);
      const options = {
        dateStyle: "short",
        timeStyle: "short",
      };
      const formattedDateTime = date.toLocaleString(undefined, options);
      return formattedDateTime;
    },
  },
];

const page = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newUser, setNewUser] = useState({});

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({});
  };

  const getUser = () => {
    getAllUser()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  const addUser = () => {
    createOrUpdateUser(newUser)
      .then(() => getUser())
      .catch((err) => console.error(err));
    handleClose();
  };

  const getById = (id) => {
    getAllUser(id)
      .then((res) => {
        setNewUser(res.data);
      })
      .catch((err) => console.error(err));
  };

  const deleteCall = () => {
    deleteUser(newUser.userId)
      .then(() => {
        getUser();
        setDeleteModal(false);
        setNewUser({});
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-24 h-screen">
      <div className="flex justify-end">
        <Button
          onClick={handleClickOpen}
          className="my-4"
          variant="outlined"
        >
          Add User
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
          >
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
                <TableCell
                  key="action"
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell className="flex justify-center items-center gap-4">
                        <Button
                          onClick={() => {
                            getById(row.userId);
                            handleClickOpen();
                          }}
                          variant="outlined"
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            getById(row.userId);
                            setDeleteModal(true);
                          }}
                          variant="outlined"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent className="w-[500px]">
          <TextField
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            value={newUser?.firstName}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            value={newUser?.lastName}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            value={newUser?.phone}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addUser}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setNewUser({});
        }}
      >
        <DialogTitle className="text-center">Are you sure?</DialogTitle>
        <DialogContent className="w-[400px]">
          <h1 className="text-center">Do you want delete?</h1>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteModal(false);
              setNewUser({});
            }}
          >
            Cancel
          </Button>
          <Button onClick={deleteCall}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default page;
