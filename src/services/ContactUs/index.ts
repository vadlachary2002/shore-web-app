import { ContactData } from '../../components/DataModels/ContactData';
import { REACT_BACKEND_URL } from '../../config';
import axios from 'axios';
interface Props{
  body: ContactData;
}
export const sendQuery = async ( props: Props ) => {
  const { body } = props;
  try {
    const response = await axios.post(`${REACT_BACKEND_URL}/v1/contact`,body);
    return response;
  } catch ( error ) {
    return null;
  }
};
