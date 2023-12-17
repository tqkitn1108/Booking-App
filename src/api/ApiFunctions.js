import api, { getHeader } from "../api/AxiosConfig";

export function countByDest(destList) {
  return api.get(`/hotels/countByDest?destinations=${destList}`);
}

export function countByType(typeList) {
  return api.get(`/hotels/countByType?types=${typeList}`);
}

// export function search(dest, checkIn, checkOut, adults, children, rooms) {
//   return api.get(`/hotels/search?location=${dest}&page=0&size=5&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&noRooms=${rooms}`);
// }