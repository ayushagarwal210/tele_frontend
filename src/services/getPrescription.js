import axios from "axios";

const Url = `http://localhost:9090/prescription/getAllPrescriptions`;

const getPrescription = async () => {
  const response = await axios.get(`${Url}`);
  console.log(response.data);
  return response.data;
};

// const exportObject = { getPrescription }

export default { getPrescription };
