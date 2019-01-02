import {getLast30Dates} from '../../services/funtions';

export const FETCH_LAST_30DAYS_FULFILLED = 'FETCH_LAST_30DAYS_FULFILLED';
export const getLast30Days =() =>{ 
    return {
        type: "FETCH_LAST_30DAYS_FULFILLED",
        payload: getLast30Dates()
    }
}