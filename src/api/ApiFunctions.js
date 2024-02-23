import api, { getHeader } from "../api/AxiosConfig";

export function countByDest(destList) {
  return api.get(`/hotels/countByDest?destinations=${destList}`);
}

export function countByType(typeList) {
  return api.get(`/hotels/countByType?types=${typeList}`);
}