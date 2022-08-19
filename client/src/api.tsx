import axios from "axios";

export const fetchMarker = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/marker`
  );
  return data;
};


export const updateMarker = async (input: any, marker_id: any) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/marker/${marker_id}`,
    input
  );

  return data;
};
