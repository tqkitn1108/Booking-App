export const bookingColumns = [
  { field: "id", headerName: "Mã đặt phòng", width: 210 },
  {
    field: "fullName",
    headerName: "Người đặt",
    width: 140,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.value}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "phoneNumber",
    headerName: "Số điện thoại",
    width: 110,
  },
  {
    field: "checkInDate",
    headerName: "Ngày nhận phòng",
    width: 100,
  },
  {
    field: "checkOutDate",
    headerName: "Ngày trả phòng",
    width: 100,
  },
  {
    field: "rooms",
    headerName: "Danh sách phòng",
    width: 150,
    renderCell: (params) => (
      <span>{params.value.map(room => room.roomNumber).join(", ")}</span>
    )
  },
  {
    field: "totalPrice",
    headerName: "Giá (VND)",
    width: 90,
  }
];

export const hotelColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <img src={params.value} alt="Image" style={{ height: 80, width: 80 }} />
    )
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 400,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 80,
  },
  {
    field: "reviews",
    headerName: "Reviews",
    width: 80,
    renderCell: (params) => (
      <span>{params.value}</span>
    )
  }
];

export const roomColumns = [
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "beds",
    headerName: "Beds",
    width: 140,
  },
  {
    field: "rooms",
    headerName: "Rooms",
    width: 200,
    renderCell: (params) => (
      <span>{params.value}</span>
    )
  },
  {
    field: "pricePerNight",
    headerName: "Price/Night(VND)",
    width: 150,
  },
  {
    field: "capacity",
    headerName: "Max People",
    width: 90,
  },
  {
    field: "amenities",
    headerName: "Amenities",
    width: 280,
  }
];
