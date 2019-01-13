export const register = (
  state = {
    auth: {},
    fetching: false,
    fetched: false,
    error: null,
    state: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'SET_AUTH_FULFILLED':
      return {
        ...state,
        auth: action.payload,
        fetching: false,
        fetched: true,
        failed: false,
        state: 'success'
      };
    case 'SET_AUTH_FAILED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'SET_AUTH_REJECTED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'SET_AUTH_PENDING':
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

export const login = (
  state = {
    auth: {},
    fetching: false,
    fetched: false,
    error: null,
    state: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'GET_AUTH_FULFILLED':
      return {
        ...state,
        auth: action.payload,
        fetching: false,
        fetched: true,
        failed: false,
        state: 'success'
      };
    case 'GET_AUTH_FAILED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'GET_AUTH_REJECTED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'GET_AUTH_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
        failed: false,
        state: 'pending',
      };
    default:
      return state;
  }
};


export const getreset = (
  state = {
    auth: {},
    fetching: false,
    fetched: false,
    error: null,
    state: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'GET_RESET_AUTH_FULFILLED':
      return {
        ...state,
        auth: action.payload,
        fetching: false,
        fetched: true,
        failed: false,
        state: 'success'
      };
    case 'GET_RESET_AUTH_FAILED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'GET_RESET_AUTH_REJECTED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'GET_RESET_AUTH_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
        failed: false,
        state: 'pending',
      };
    default:
      return state;
  }
};

export const validate = (
  state = {
    auth: {},
    fetching: false,
    fetched: false,
    error: null,
    state: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'VALIDATE_AUTH_FULFILLED':
      return {
        ...state,
        auth: action.payload,
        fetching: false,
        fetched: true,
        failed: false,
        state: 'success'
      };
    case 'VALIDATE_AUTH_FAILED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'VALIDATE_AUTH_REJECTED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'VALIDATE_AUTH_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
        failed: false,
        state: 'pending',
      };
    default:
      return state;
  }
};

export const token = (
  state = {
    auth: {},
    fetching: false,
    fetched: false,
    error: null,
    state: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'SET_TOKEN_FULFILLED':
      return {
        ...state,
        auth: action.payload,
        fetching: false,
        fetched: true,
        failed: false,
        state: 'success'
      };
    case 'SET_TOKEN_FAILED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'SET_TOKEN_REJECTED':
      return {
        ...state,
        fetching: false,
        fetched: false,
        failed: true,
        state: 'failed',
        error:action.payload
      };
    case 'SET_TOKEN_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
        failed: false,
        state: 'pending',
      };
    default:
      return state;
  }
};
