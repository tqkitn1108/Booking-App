export const filters = [
  {
    id: "star",
    name: "Xếp hạng chỗ nghỉ",
    options: [
      {value: '1', label: "1 sao"},
      {value: '2', label: "2 sao"},
      {value: '3', label: "3 sao"},
      {value: '4', label: "4 sao"},
      {value: '5', label: "5 sao"},
      {value: '0', label: "Không xếp hạng"}
    ]
  },
  {
    id: "type",
    name: "Loại chỗ ở",
    options: [
      {value: "apartment", label: "Căn hộ"},
      {value: "hotel", label: "Khách sạn"},
      {value: "homestay", label: "Homestays"},
      {value: "resort", label: "Resort"},
      {value: "villa", label: "Biệt thự"},
      {value: "guesthouse", label: "Nhà khách"}
    ]
  },
  {
    id: "rating",
    name: "Điểm đánh giá của khách",
    options: [
      {value: "wonderful", label: "Tuyệt hảo: 9 điểm trở lên"},
      {value: "excellent", label: "Rất tốt: 8 điểm trở lên"},
      {value: "good", label: "Tốt: 7 điểm trở lên"},
      {value: "pleasant", label: "Dễ chịu: 6 điểm trở lên"}
    ]
  },
  {
    id: "facilities",
    name: "Tiện nghi",
    options: [
      {value: "family_room", label: "Phòng gia đình"},
      {value: "non_smoking", label: "Phòng không hút thuốc"},
      {value: "parking", label: "Chỗ đỗ xe"},
      {value: "pool", label: "Hồ bơi"}
    ]
  }
  // {
  //   id: "amenities",
  //   name: "Tiện nghi phòng",
  //   options: [
  //     {value: "ocean_view", label: "Nhìn ra biển"},
  //     {value: "private_bathroom", label: "Phòng tắm riêng"},
  //     {value: "private_pool", label: "Hồ bơi riêng"},
  //     {value: "balcony", label: "Ban công"},
  //     {value: "bathtub", label: "Bồn tắm"}
  //   ]
  // }
]