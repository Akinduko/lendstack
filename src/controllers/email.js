import axios from 'axios'
import config from '../config.json';

export const verifyEmail = async (email) => {
  try {
    const result = await axios.get(`${config.email_base}/${email}`)
    return result.data
  }
  catch(error){
    throw error
  }
}
