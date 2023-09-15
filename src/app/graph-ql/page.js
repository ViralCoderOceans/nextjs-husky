"use client";

import React, { useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
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
import useGames from "./useGames";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "platform",
    label: "Platform",
    minWidth: 100,
    format: (value) => {
      return value.join(", ");
    },
  },
];

const page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {
    allGames,
    singleGame,
    addNewGame,
    updateGame,
    deleteGame,
    newGame,
    setNewGame,
    platforms,
    setPlatforms,
    handleChange,
    handleCheckbox,
    resetForm,
  } = useGames();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const addGame = async () => {
    addNewGame({ variables: { game: { ...newGame } } });
    allGames.refetch();
    resetForm();
    handleClose();
  };

  const editGame = async () => {
    const { id, __typename, ...data } = newGame;
    updateGame({
      variables: {
        updateGameId: id,
        edits: data,
      },
    });
    allGames.refetch();
    resetForm();
    setIsEdit(false);
    handleClose();
  };

  const getGameById = (_id) => {
    singleGame.refetch({ gameId: _id }).then((res) => {
      setNewGame({ ...res.data.game });
      setPlatforms([...res.data.game.platform]);
    });
  };

  const deleteCall = () => {
    deleteGame({ variables: { deleteGameId: newGame.id } });
    allGames.refetch();
    setDeleteModal(false);
    resetForm();
  };

  if (allGames.loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center gap-4">
        <CircularProgress />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 h-screen">
      <h1 className="font-bold text-2xl text-center">GraphQL</h1>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Users Data</h1>
        <Button
          onClick={() => setOpen(true)}
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
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allGames.data?.games
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
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        align="right"
                        className="flex gap-4"
                      >
                        <Button
                          onClick={() => {
                            setIsEdit(true);
                            getGameById(row.id);
                            setOpen(true);
                          }}
                          variant="outlined"
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            getGameById(row.id);
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
          rowsPerPageOptions={[7, 14]}
          component="div"
          count={allGames.data?.games.length ?? "wait"}
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
          <h1 className="mt-4">Title</h1>
          <TextField
            margin="dense"
            id="title"
            name="title"
            value={newGame?.title}
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <h1 className="mt-4">Platform</h1>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={
                    platforms?.filter((elm) => elm === "PS5").length
                      ? true
                      : false
                  }
                />
              }
              label="PS5"
              value="PS5"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={
                    platforms?.filter((elm) => elm === "Xbox").length
                      ? true
                      : false
                  }
                />
              }
              label="Xbox"
              value="Xbox"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={
                    platforms?.filter((elm) => elm === "Switch").length
                      ? true
                      : false
                  }
                />
              }
              label="Switch"
              value="Switch"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={
                    platforms?.filter((elm) => elm === "PC").length
                      ? true
                      : false
                  }
                />
              }
              label="PC"
              value="PC"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!isEdit ? (
            <Button onClick={addGame}>Add</Button>
          ) : (
            <Button onClick={editGame}>Edit</Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setNewGame({});
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
              setNewGame({});
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
