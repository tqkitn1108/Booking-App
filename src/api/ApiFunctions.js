import api, { getHeader } from "../api/AxiosConfig";

export function countByDest(destList) {
  return api.get(`/hotels/countByDest?destinations=${destList}`);
}