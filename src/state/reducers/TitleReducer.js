import {
SET_DASHBOARD_TITLE_FULFILLED,
SET_WIDGET_TITLE_FULFILLED,
SET_TRANSFER_TITLE_FULFILLED,
SET_PLAYLIST_TITLE_FULFILLED,
SET_PROFILE_TITLE_FULFILLED,
SET_MEDIA_UPLOAD_TITLE_FULFILLED,
SET_TRACK_TITLE_FULFILLED,
SET_AUDIENCE_TITLE_FULFILLED,
SET_VIDEO_TITLE_FULFILLED,
SET_ARTIST_TITLE_FULFILLED
} from '../actions/TitleActions';

 
export const title = (
 state =   {
        title : "Dashboard",
        fetching: false,
        fetched: false,
        error: null
    }, action )=>{
        switch(action.type) {
            case SET_DASHBOARD_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_WIDGET_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_TRANSFER_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_PLAYLIST_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_PROFILE_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_MEDIA_UPLOAD_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_TRACK_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_AUDIENCE_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_AUDIENCE_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_VIDEO_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            case SET_ARTIST_TITLE_FULFILLED:
                return {
                    ...state,
                    title: action.payload,
                    fetching: false,
                    fetched: true,
                    failed: false
                }
            default:
                return state;
        }

    }