const options = {
    LOGIN:"auth",
    REGISTER:"auth",
    CHANGE_USER_PASSWORD:"auth",
    GET_LENDER_PROFILE:"lender",
    GET_USER_PROFILE:"user",
    SET_REGISTERED_EMAIL:"email",
    SET_REGISTRATION_AUTH:"registration_auth",
    GET_USER_BANKS:"user_banks",
    GET_ALL_BANKS:"all_banks",
    SET_LOAN_ACTION:"new_loan"
}
export const action = (    
    state = {
      result: {},
      fetching: false,
      fetched: false,
      error: null,
      state: 'default'
    },
    action
  ) => {
    const entity= action.type.split("_").splice(0,3).join("_")
    switch (action.type) {
      case `${entity}_FULFILLED`:
      return {
          ...state,
          fetching: false,
          fetched: true,
          failed: false,
          [`${options[entity]}_state`]: 'success',
          [options[entity]]:action.payload
        };

      case `${entity}_FAILED`:
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        [`${options[entity]}_state`]: 'failed',
        [`${options[entity]}_error`]:action.payload
      };

      case `${entity}_REJECTED`:
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        [`${options[entity]}_state`]: 'failed',
        [`${options[entity]}_error`]:action.payload
      };

      case `${entity}_PENDING`:
        return {
          ...state,
          fetching: true,
          fetched: false,
          failed: false,
          [`${options[entity]}_state`]: 'pending',
        };
      default:
        return state;
    }
  };