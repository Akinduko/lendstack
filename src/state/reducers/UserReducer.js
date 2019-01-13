export const updateuser= (
  state = {
    user: {},
    fetching: false,
    fetched: false,
    error: null,
    state: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'UPDATE_USER_FULFILLED':
      return {
        ...state,
        user: action.payload,
        fetching: false,
        fetched: true,
        failed: false,
        state: 'success'
      };
    case 'UPDATE_USER_FAILED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'UPDATE_USER_REJECTED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'UPDATE_USER_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
        failed: false,
        state: 'pending'
      };
    default:
      return state;
  }
};


export const getuser= (
  state = {
    user: {},
    fetching: false,
    fetched: false,
    error: null,
    state: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        user: action.payload,
        fetching: false,
        fetched: true,
        failed: false,
        state: 'success'
      };
    case 'GET_USER_FAILED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'GET_USER_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
        failed: false,
        state: 'pending'
      };
    default:
      return state;
  }
};