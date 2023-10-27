import "./listList.css";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { useContext, useEffect } from "react";

import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";
export const ListList = () => {
  const { lists, dispatch } = useContext(ListContext);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (listId) => {
    deleteList(listId, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },

    { field: "title", headerName: "Title", width: 250 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/lists/${params.row._id}`} state={params.row}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              onClick={() => handleDelete(params.row._id)}
              className="productListDelete"
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
};
