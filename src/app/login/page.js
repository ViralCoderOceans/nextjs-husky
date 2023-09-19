"use client";

import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { loginUser } from "../../../services/actions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Page = () => {
  const { push } = useRouter();
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (user.username && user.password) {
      loginUser(user).then(() => push("/role-base-api-access"));
    }
  };

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      push("/role-base-api-access");
    }
  }, []);

  return (
    <div className="p-6 h-screen flex flex-col items-center gap-6">
      <h1 className="font-bold text-2xl text-center">Role-base API access</h1>
      <div className="flex flex-col justify-between p-6 h-[300px] w-[400px] bg-zinc-100 rounded-lg">
        <h1 className="font-medium text-2xl text-center">Login</h1>
        <div>
          <TextField
            margin="dense"
            id="username"
            name="username"
            label="User Name"
            value={user?.username}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            value={user?.password}
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </div>
        <Button
          onClick={handleSubmit}
          variant="outlined"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
