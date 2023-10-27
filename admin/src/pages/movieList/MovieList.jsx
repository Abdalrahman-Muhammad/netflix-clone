import "./movieList.css";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { MoviesContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
export const MovieList = () => {
  const { movies, dispatch } = useContext(MoviesContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (movieId) => {
    deleteMovie(movieId, dispatch);
  };
  console.log(movies);
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },

    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "IsSeries", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/movies/${params.row._id}`} state={params.row}>
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
        rows={movies}
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
