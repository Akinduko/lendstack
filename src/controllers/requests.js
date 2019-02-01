import axios from 'axios';
import config from '../config.json';



export const get_action = async (token,paths="",params="") => {
  try {
      const options ={
          headers:{
              Authorization: token
          }
      }
    const response = await axios.get(`${config.base_url}/api/${paths}${params}`,options);
    return response.data
  }
  catch (error) {
    throw error;
  }
}

export const put_action = async (token,body,paths,params) => {
    try {
        const options ={
            headers:{
                Authorization: token
            }
        }
      const response = await axios.put(`${config.base_url}/api/${paths}${params}`,body,options);
      return response.data
    }
    catch (error) {

      throw error;
    }
  }
  
  export const post_action = async (token,body,paths,params) => {
    try {
        const options ={
            headers:{
                Authorization: token
            }
        }
      const response = await axios.post(`${config.base_url}/api/${paths}${params}`,body,options);
      return response.data
    }
    catch (error) {

      throw error;
    }
  }

  export const delete_action = async (token,paths,params) => {
    try {
        const options ={
            headers:{
                Authorization: token
            }
        }
      const response = await axios.get(`${config.base_url}/api/${paths}${params}`,options);
      return response.data
    }
    catch (error) {
      throw error;
    }
  }

  export const uploads = async (token,paths,id,file) => {

      const options ={
        headers:{
            Authorization: token,
            'content-type': 'multipart/form-data'
        }
    }
      const formData = new FormData();
      formData.append('file',file)
      formData.append('folder',`${paths}/${id}`)
    const response = await axios.post(`${config.base_url}/api/integrations/uploads/file`,formData,options);
    return response.data;
  };