import { useEffect, useState } from "react";
import api from "../api/AxiosConfig";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [url]);

  async function reFetch() {
    setLoading(true);
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }

  return {data, loading, error, reFetch};
}

export default useFetch;