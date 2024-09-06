import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { updateUserDetails } from "@/Api";
import { getAllUsers } from "@/Api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TableSortLabel,
  Dialog,
  TextField,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import Head from "next/head";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const getUsers = async () => {
    try {
      const response = await axios.get(getAllUsers);
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${updateUserDetails}/${open._id}`, {
        formData: open,
      });
      if (res.status === 200) {
        Swal.fire({
          title: "Updated",
          icon: "success",
          text: "User Details updated successfully...",
        });
        getUsers();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed",
        icon: "Failed",
        text: error.message,
      });
    }
  };

  // Sorting function
  const handleSort = (property) => {
    const isAsc = sortConfig.key === property && sortConfig.direction === "asc";
    const newDirection = isAsc ? "desc" : "asc";
    setSortConfig({ key: property, direction: newDirection });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[property] < b[property])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[property] > b[property])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  // Handle change for dynamic input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpen((prevState) => ({ ...prevState, [name]: value }));
  };

  // Dynamically create input fields for user details
  const inputFields = Object.keys(open)
    .filter(
      (key) =>
        key !== "_id" &&
        key !== "__v" &&
        key !== "password" &&
        key !== "userType"
    ) // Exclude the _id field
    .map((key) => (
      <TextField
        key={key}
        name={key}
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        value={open[key] || ""}
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
    ));

  const status = ["Verified", "Not Verified", "Blocked"];

  return (
    <>
      <Head>
        <title>The Grow Food</title>
        <meta
          name="description"
          content="The Grow Food Is B2B solution for Restaurants"
        />
        <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
      </Head>
      <div>
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          className="txt-1 font-semibold mt-4"
        >
          Users and Vendors
        </Typography>
        <TableContainer component={Paper} className="bg-inherit">
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Type",
                  "name",
                  "email",
                  "mobile",
                  "shopName",
                  "shopAddress",
                  "status",
                ].map((column) => (
                  <TableCell key={column} className="font-semibold txt-1">
                    <TableSortLabel
                      active={sortConfig.key === column}
                      direction={
                        sortConfig.key === column ? sortConfig.direction : "asc"
                      }
                      onClick={() => handleSort(column)}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="">
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  onClick={() => setOpen(user)}
                  className=""
                >
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.shopName}</TableCell>
                  <TableCell>{user.shopAddress}</TableCell>
                  <TableCell>{user.userStatus ?? "Not Verified"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Handling Editing */}
      <Dialog open={Boolean(open)} onClose={() => setOpen("")}>
        <div className="m-4 px-8">
          <div className="flex justify-between items-center">
            {status.map((item, index) => (
              <Tooltip
                key={index}
                title={`Current Status : ${open.userStatus}` ?? "Not Updated"}
              >
                <button
                  onClick={() => {
                    setOpen({
                      ...open,
                      userStatus: item,
                    });
                  }}
                  className={`${
                    index === 0
                      ? "bg-color-1 hover:cursor-pointer px-4 rounded-sm focus:shadow-md focus:shadow-black"
                      : `
                        ${
                          index === 1
                            ? "bg-yellow-600 hover:cursor-pointer text-white px-4 rounded-sm focus:shadow-md focus:shadow-black"
                            : `${
                                index === 2 &&
                                "bg-red-600 hover:cursor-pointer text-white px-4 rounded-sm focus:shadow-md focus:shadow-black"
                              }`
                        }`
                  }`}
                >
                  {item}
                </button>
              </Tooltip>
            ))}
          </div>
          <div className="mt-2">{inputFields}</div>

          <Autocomplete
            options={["Restaurant", "Vendor", "Admin"]}
            value={open.userType ?? ""}
            onChange={(event, newValue) => {
              // if (newValue === "Admin") {
              //   Swal.fire({
              //     title: "Verification",
              //     icon: "info",
              //     input: "number", // Ensure input type is set to text
              //     inputPlaceholder: "Enter Pass Code",
              //     showCancelButton: true,
              //     inputAutoFocus: true,

              //     confirmButtonText: "Verify",
              //     inputValidator: (value) => {
              //       if (!value) {
              //         return "You need to enter a passcode!";
              //       } else if (value !== "727798") {
              //         setOpen({
              //           ...open,
              //           userType: "Restaurant", // Set to Restaurant if passcode is incorrect
              //         });
              //         return "Incorrect passcode!";
              //       }
              //     },
              //   }).then((result) => {
              //     if (result.value === "727798") {
              //       // If passcode is correct, keep Admin
              //       setOpen({
              //         ...open,
              //         userType: newValue,
              //       });
              //     }
              //   });
              // } else {
              //   setOpen({
              //     ...open,
              //     userType: newValue,
              //   });
              // }
              setOpen({
                ...open,
                userType: newValue,
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="User Type"
                fullWidth
                margin="normal"
              />
            )}
          />

          <Button onClick={handleUpdate}>Submit</Button>
        </div>
      </Dialog>
    </>
  );
};

export default Users;
