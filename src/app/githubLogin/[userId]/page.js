"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getGithubUser, logoutGithub } from "../../../../services/actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const page = () => {
  const { push } = useRouter();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    if (userId) {
      getGithubUser(userId).then((res) => setUser(res.user));
    }
  }, [userId]);

  const handleLogout = () => {
    logoutGithub().then(() => push("/"));
    setLogoutModal(false);
  };

  return (
    <div className="p-6 h-screen">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-center">
          Signed-in with Github
        </h1>
        <Button
          onClick={() => setLogoutModal(true)}
          variant="outlined"
        >
          Logout
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Users Data</h1>
      </div>
      <br />
      <div className="flex flex-col justify-between">
        <h1 className="text-xl font-medium">Id: {user?.id}</h1>
        <h1 className="text-xl font-medium">Name: {user?.name}</h1>
        <h1 className="text-xl font-medium">Username: {user?.username}</h1>
        <h1 className="text-xl font-medium">Email: {user?.email}</h1>
      </div>
      <Dialog
        open={logoutModal}
        onClose={() => setLogoutModal(false)}
      >
        <DialogTitle className="font-semibold">Are you sure?</DialogTitle>
        <DialogContent className="w-[400px]">
          <h1 className="font-medium">Do you want logout?</h1>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setLogoutModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleLogout}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default page;
