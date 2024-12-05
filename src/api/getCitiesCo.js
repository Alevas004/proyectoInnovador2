import axios from "axios";


export const getCitiesCo = () => {
  const cities = async () => {
    try {
      const res = await axios.get("http://localhost:8080/cities");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  return cities();
};
