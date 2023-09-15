"use client";

import React, { useEffect, useState } from "react";
import { getAllImages, uploadFile } from "../../../services/actions";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { BASE_URL } from "../../../constants/constants";
import { message } from "antd";

const columns = [
  { id: "filename", label: "File Name", minWidth: 170 },
  { id: "originalname", label: "Original Name", minWidth: 100 },
];

const page = () => {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [file, setFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllFiles = () => {
    getAllImages()
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  const handleInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile(file).then(() => getAllFiles());
  };

  return (
    <div className="p-6 h-screen">
      <h1 className="font-bold text-2xl text-center">
        File - Upload and Download
      </h1>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Images Data</h1>
      </div>
      <div className="border border-black p-4 my-4 rounded-md">
        <h1 className="text-lg font-normal">Add Image:</h1>
        <input
          type="file"
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="outlined"
        >
          Submit
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
              {files
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
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        key={row.filename}
                        className="flex justify-center items-center gap-4"
                      >
                        <Button
                          onClick={() => {
                            setSelectedFile(row.filename);
                            setIsModalOpen(true);
                          }}
                          variant="outlined"
                          color="error"
                        >
                          Preview
                        </Button>
                        <a
                          href={`${BASE_URL}files/download/${row.filename}`}
                          onClick={() =>
                            message.success("Download started successfully.")
                          }
                          download={row.filename}
                          className="p-2 px-4 border uppercase border-blue-500 rounded-md text-blue-500 hover:bg-blue-100 transition-all"
                        >
                          Download
                        </a>
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
          count={files.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <DialogTitle className="text-center">Preview</DialogTitle>
        <DialogContent>
          <iframe
            height="500"
            width="500"
            src={`http://localhost:3001/files/images/${selectedFile}`}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
