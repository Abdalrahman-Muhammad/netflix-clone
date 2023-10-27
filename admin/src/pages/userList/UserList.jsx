import "./userlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";

export const UserList = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (userId) => {
    setData(data.filter((user) => user.id !== userId));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

    { field: "status", headerName: "Status", width: 120 },
    { field: "transaction", headerName: "Transaction Volume", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/users/${params.row.id}`}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              onClick={() => handleDelete(params.row.id)}
              className="userListDelete"
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
