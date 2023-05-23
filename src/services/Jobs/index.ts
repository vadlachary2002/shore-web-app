import { Job } from '../../components/DataModels/Job';
import FormData from '../../components/DataModels/FormData';

import { REACT_BACKEND_URL } from '../../config';
import axios from 'axios';
import { SearchData } from '../../components/DataModels/SearchData';
const instance = axios.create({
  withCredentials: true,
});

interface PostJobProps{
  form:FormData;
}

export const fetchJobs = async (page: Number) => {
  try {
    const response = await axios.get<Job[]>(`${REACT_BACKEND_URL}/v1/job?page=${page}`);
    return response;
  } catch ( error ) {
    return null;
  }
};

export const fetchJobsByAdmin = async (page: Number) => {
  try {
    const response = await instance.get<Job[]>(`${REACT_BACKEND_URL}/v1/admin?page=${page}`);
    return response;
  } catch ( error ){
    return null;
  }
};

export const getJobByUser= async(page: Number)=>{
  try {
    const response=await instance.get<Job[]>(`${REACT_BACKEND_URL}/v1/job/user?page=${page}`);
    return response;

  }catch(error){
    return error;
  }
};

export const getRejectedJobs = async (page:Number) => {
  try{
    const rejectedJobs = await instance.get<Job[]>(`${REACT_BACKEND_URL}/v1/admin/reject?page=${page}`);
    return rejectedJobs;
  } catch( error ){
    return error.response;
  }
};
interface Props{
  id:string;
}
export const setStatusReject = async (props:Props) => {
  const { id } = props;
  try {
    const status = await instance.put(`${REACT_BACKEND_URL}/v1/admin/reject/${id}`);
    return status;
  } catch( error) {
    return error.response;
  }
};
export const setStatusApprove = async (props:Props) => {
  const { id } = props;
  try {
    const status = await instance.post(`${REACT_BACKEND_URL}/v1/admin/approve/${id}`);
    return status;
  } catch( error) {
    return error.response;
  }
};
export const fetchRecomendedJobs= async(page:Number)=>{
  try{
    const response= await axios.get<Job[]>(`${REACT_BACKEND_URL}/v1/job/recomended?page=${page}`);
    return response;
  }
  catch(error){
    return error;
  }
};
export const getSearchJobs = async (search:SearchData,page:Number) =>{
  try {
    const searchContent = JSON.stringify(search);
    const response = await axios.get<Job[]>(`${REACT_BACKEND_URL}/v1/job/search?page=${page}&search=${searchContent}`);
    return response;
  } catch ( error ) {
    return null;
  }
};
export const getJobById = async (jobId:string) =>{
  try {
    const response = await axios.get<Job>(`${REACT_BACKEND_URL}/v1/job/get/${jobId}`);
    return response;
  } catch ( error ) {
    return error.response;
  }
};

export const getHighlights = async () => {
  try{
    const response = await axios.get(`${REACT_BACKEND_URL}/v1/job/highlights`);
    return response.data;
  }catch (error){
    return [];
  }
};
