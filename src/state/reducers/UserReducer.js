import {
    FETCH_CP_DETAILS_FULFILLED,
} from '../actions/UserActions';

export const cpDetails = (
 state =   {
        cpdetails : {},
        fetching: false,
        fetched: false,
        error: null
    }, action )=>{
        switch(action.type) {
            case FETCH_CP_DETAILS_FULFILLED:
                return {
                    ...state,
                    cpdetails: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            default:
                return state;
        }

    }