import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../../../api/AxiosConfig";
import { AuthContext } from "../../../context/AuthContext";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";

const RoomsDatatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname;
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/business/${user.userId}/hotels`);
        setList(response.data.map(hotel =>
        ({
          id: hotel.id,
          image: hotel.photos[0],
          name: hotel.name,
          type: hotel.type.label,
          address: hotel.address,
          rating: hotel.rating,
          reviews: hotel.reviews.length
        })));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách sạn này không?')) {
      try {
        await api.delete(`${path}/${id}`);
        setList(list.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`${path}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" style={{ width: "100%" }}>
      {loading && <LoadingSpinner />}
      <div className="datatableTitle">
        Danh sách khách sạn
        <Link to={`${path}/form`} className="link">
          Thêm khách sạn
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
        getRowId={(row) => row.id}
        getRowHeight={() => 100}
      />
    </div>
  );
};

export default RoomsDatatable;
