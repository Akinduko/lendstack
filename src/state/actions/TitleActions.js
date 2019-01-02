export const SET_DASHBOARD_TITLE_FULFILLED = "SET_DASHBOARD_TITLE_FULFILLED"
export const SET_WIDGET_TITLE_FULFILLED = "SET_WIDGET_TITLE_FULFILLED"
export const SET_TRANSFER_TITLE_FULFILLED = "SET_TRANSFER_TITLE_FULFILLED"
export const SET_PLAYLIST_TITLE_FULFILLED = "SET_PLAYLIST_TITLE_FULFILLED"
export const SET_PROFILE_TITLE_FULFILLED = "SET_PROFILE_TITLE_FULFILLED"
export const SET_MEDIA_UPLOAD_TITLE_FULFILLED = "SET_MEDIA_UPLOAD_TITLE_FULFILLED"
export const SET_TRACK_TITLE_FULFILLED = "SET_TRACK_TITLE_FULFILLED"
export const SET_AUDIENCE_TITLE_FULFILLED = "SET_AUDIENCE_TITLE_FULFILLED"
export const SET_VIDEO_TITLE_FULFILLED = "SET_VIDEO_TITLE_FULFILLED"
export const SET_ARTIST_TITLE_FULFILLED = "SET_ARTIST_TITLE_FULFILLED"

export const setDashboardTitle = ()=>{ 
    return {
        type: "SET_DASHBOARD_TITLE_FULFILLED",
        payload:  "Dashboard"
    }
}

export const setAudienceTitle = ()=>{ 
    return {
        type: "SET_AUDIENCE_TITLE_FULFILLED",
        payload: "Audience"
                
    }
}

export const setArtistTitle = ()=>{ 
    return {
        type: "SET_ARTIST_TITLE_FULFILLED",
        payload:  "Artists"
    }
}

export const setTrackTitle = ()=>{ 
    return {
        type: "SET_TRACK_TITLE_FULFILLED",
        payload:  "Tracks"
    }
}

export const setVideoTitle = ()=>{ 
    return {
        type: "SET_VIDEO_TITLE_FULFILLED",
        payload: "Video"
    }
}

export const setMediaUploadTitle = ()=>{ 
    return {
        type: "SET_MEDIA_UPLOAD_TITLE_FULFILLED",
        payload: "Playlists"
        }
}

export const setTransferTitle = ()=>{ 
    return {
        type: "SET_TRANSFER_TITLE_FULFILLED",
        payload: "Transfers"

    }
}

export const setPlaylistTitle = ()=>{ 
    return {
        type: "SET_PLAYLIST_TITLE_FULFILLED",
        payload: "Playlists"
    }
}

export const setProfileTitle = ()=>{ 
    return {
        type: "SET_PROFILE_TITLE_FULFILLED",
        payload: "Profile"

    }
}

export const setWidgetTitle = ()=>{ 
    return {
        type: "SET_WIDGET_TITLE_FULFILLED",
        payload: "Widgets"
    }
}