import api, { getHeader } from "../api/AxiosConfig";

export function countByDest(destList) {
  return api.get(`/hotels/count-by-dest?destinations=${destList}`);
}

export function countByType(typeList) {
  return api.get(`/hotels/count-by-type?types=${typeList}`);
}