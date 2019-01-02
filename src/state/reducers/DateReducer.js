import {
    FETCH_LAST_30DAYS_FULFILLED,
} from '../actions/DateActions';

 
export const last30Days = (
    state =   {
        last30days : [],
        fetching: false,
        fetched: false,
        error: null
       }, action )=>{
        switch(action.type) {
            case FETCH_LAST_30DAYS_FULFILLED:
                return {
                    ...state,
                    last30days: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                };
    default:
        return state;
}}
