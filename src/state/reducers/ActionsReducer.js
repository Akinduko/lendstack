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
    GET_PRODUCT_GROUP:"all_groups",
    SET_LOAN_ACTION:"new_loan",
    GET_PRODUCT_FIELDS:"group_fields",
    SET_NEW_PRODUCT:"new_product",
    SET_PRODUCT_TAB:"product_tab",
    CREATE_NEW_PRODUCT:"create_product",
    SET_NEW_PRODUCT:"set_product",
    GET_ALL_PRODUCTS:"all_products",
    GET_PRODUCT_FIELD:"product_field",
    SET_EDIT_PRODUCT:"edit_product",
    SET_VIEW_PRODUCT:"view_product",
    GET_PRODUCT_PARAMETERS:"product_parameters",
    CREATE_NEW_PARAMETER:"create_parameter",
    EDIT_PRODUCT_PARAMETERS:"edit_product_parameters",
    UPDATE_PRODUCTS_STATUS: "update_product_status",
    UPDATE_NEW_PRODUCT:"update_new_product",
    UPDATE_NEW_PARAMETER:"update_new_parameter",
    EDIT_PRODUCT_FIELDS:"edit_product_fields",
    EDIT_PRODUCT_GROUPS:"edit_product_groups"
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