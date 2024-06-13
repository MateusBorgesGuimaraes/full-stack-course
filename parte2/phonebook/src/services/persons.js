import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

export const getAllPersons = () => {
  return axios.get(baseUrl);
};

export const cretatePerson = (personObject) => {
  return axios.post(baseUrl, personObject);
};

export const updatePerson = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject);
};

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
