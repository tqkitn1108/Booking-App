import axios from "axios";
import { API_BASE_URL } from "./UrlConstant";

export default axios.create({
	baseURL: `${API_BASE_URL}/api/v1`
})

export const getHeader = () => {
	const token = localStorage.getItem("token");
	return {
		Authorization: `Bearer ${token}`
		// "Content-Type": "application/json"
	}
}