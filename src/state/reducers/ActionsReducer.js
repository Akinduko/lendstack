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
    EDIT_PRODUCT_GROUPS:"edit_product_groups",
    GET_ALL_LOANS:"get_all_loans",
    GET_GROUP_BYPRODUCT:"group_by_product",
    SET_LOAN_TAB:"loan_group_id",
    GET_FIELD_BYPRODUCT:"field_by_group",
    CREATE_NEW_LOAN: "create_new_loan",
    GET_FIELD_TYPES:"all_field_types",
    GET_SELECTION_VALUES: "get_selection_values",
    GET_ALL_TRANSACTIONS:"get_all_transactions",
    GET_PENDING_LOANS:"get_pending_loans",
    UPDATE_LOAN_FIELD:"update_loan_field",
    GET_CURRENT_PRODUCT:"get_current_product",
    GET_ALL_SCHEDULE:"get_all_schedule",
    CREATE_LENDER_ACCOUNT:"create_lender_account",
    GET_ALL_ROLES:"get_roles",
    GET_ALL_USERS:"get_all_users",
    UPDATE_USER_PROFILE:"update_user_profile",
    CREATE_LENDER_USER:"create_lender_user",
    SET_PENDING_LOAN:"set_pending_loan",
    APPROVE_LOAN_STATUS:"approve_loan_status",
    GET_LENDER_DASHBOARD:"lender_dashboard",
    GET_ALL_REPORTS:"report",
    GET_RESET_AUTH:"reset_auth",
    SET_RESET_AUTH:"set_reset_auth",
    NEW_USER_STATE:"new_user",
    INVITE_LENDER_BORROWERS:"invite_borrower",
    SET_CURRENT_COMPANY:"current_company",
    ACTIVATE_REGISTRATION_AUTH:"activate_auth"
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
        case `USER_LOGOUT_FULFILLED`:
        return {};
      default:
        return state;
    }
  };