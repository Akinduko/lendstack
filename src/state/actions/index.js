export const actions = (action,result) => {

  try{
    return {
      type: action,
      payload: result,
      value:action
    };
  }
  catch(error){
    return {
      type: action,
      payload: error,
      value:action
    };   
  }
};