import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../../../api/AxiosConfig";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname;
  const { hotelId } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/hotels/${hotelId}/roomTypes`);
        setList(response.data.map(roomType =>
        ({
          id: roomType.id,
          title: roomType.title,
          beds: roomType.beds,
          pricePerNight: roomType.pricePerNight,
          capacity: roomType.capacity,
          rooms: roomType.rooms.map(room => room.roomNumber).join(", "),
          amenities: roomType.amenities.join(", ")
        })));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng này không?')) {
      try {
        await api.delete(`/hotels/${hotelId}/roomTypes/${id}`);
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
      width: 150,
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
        Danh sách phòng
        <Link to={`${path}/form`} className="link">
          Thêm phòng mới
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
        getRowHeight={() => 60}
      />
    </div>
  );
};

export default Datatable;
