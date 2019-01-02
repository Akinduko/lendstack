import {
    FETCH_CP_PROFILE_FULFILLED,
} from '../actions/ArtistActions';

 
export const cpProfile = (
    state =   {
        cpprofile : {},
        fetching: false,
        fetched: false,
        error: null
       }, action )=>{
        switch(action.type) {
            case FETCH_CP_PROFILE_FULFILLED:
                return {
                    ...state,
                    cpprofile: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                };
    default:
        return state;
}}
