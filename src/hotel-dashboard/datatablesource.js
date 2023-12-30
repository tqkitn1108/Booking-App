export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
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
    width: 450,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 100,
  },
  {
    field: "reviews",
    headerName: "Reviews",
    width: 100,
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
