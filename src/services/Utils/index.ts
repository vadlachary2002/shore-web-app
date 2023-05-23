import { REACT_BACKEND_URL } from '../../config';
import axios from 'axios';


export const getDisciplines = async () => {
  try {
    const response = await axios.get(`${REACT_BACKEND_URL}/v1/utils/discipline`);
    return response.data;
  } catch ( error ) {
    return [];
  }
};

export const getTitles = async () => {
  try {
    const response = await axios.get(`${REACT_BACKEND_URL}/v1/utils/titles`);
    return response.data;
  } catch ( error ) {
    return [];
  }
};

export const getSectors = async () => {
  try {
    const response = await axios.get(`${REACT_BACKEND_URL}/v1/utils/sector`);
    return response.data;
  } catch ( error ) {
    return [];
  }
};

export const getRegions = async ()=> {
  try {
    const response = await axios.get(`${REACT_BACKEND_URL}/v1/utils/region`);
    return response.data;
  } catch ( error ) {
    return [];
  }
};