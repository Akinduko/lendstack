export const FETCH_CONNECTION_PENDING = 'SET_CONNECTION_FULFILLED';
export const FETCH_CONNECTION_REJECTED = 'FETCH_CONNECTION_REJECTED';
export const FETCH_CONNECTION_FULFILLED='FETCH_CONNECTION_FULFILLED';
export const FETCH_LISTENERS_FULFILLED = 'FETCH_LISTENERS_FULFILLED';
export const FETCH_STREAMS_FULFILLED ='FETCH_STREAMS_FULFILLED';
export const FETCH_MALE_LISTENERS_FULFILLED = 'FETCH_MALE_LISTENERS_FULFILLED';
export const FETCH_FEMALE_LISTENERS_FULFILLED= 'FETCH_FEMALE_LISTENERS_FULFILLED';
export const FETCH_DEVICE_LABEL='FETCH_DEVICE_LABEL';
export const DEVICE_LABEL='DEVICE_LABEL';
export const FETCH_SEX='FETCH_SEX';
export const FETCH_CONNECTION_TABLE_FULFILLED = "FETCH_CONNECTION_TABLE_FULFILLED"
export const FETCH_OTHER_ARTISTS_FULFILLED = "FETCH_OTHER_ARTISTS_FULFILLED"



export const fetchConnectionTable = ()=>{ 
    return {
        type: "FETCH_CONNECTION_TABLE_FULFILLED",
        payload: [{
                  id: 1,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 2,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 3,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 4,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 5,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 6,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 7,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 8,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 9,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                },
                {
                  id: 10,
                  COUNTRY: 'Tanner Linsley',
                  CONNECTIONS: 26
                }]
    }
}

export const fetchOtherArtists = ()=>{ 
    return {
        type: "FETCH_OTHER_ARTISTS_FULFILLED",
        payload: [{
                  id: 1,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                },
                {
                  id: 2,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                },
                {
                  id: 3,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                },
                {
                  id: 4,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                },
                {
                  id: 5,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                },
                {
                  id: 6,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                },
                {
                  id: 7,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                },
                {
                  id: 8,
                  name: 'Tanner Linsley',
                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
                }]
    }
}

export const fetchConnection = ()=>{ 
    return {
        type: "FETCH_CONNECTION_FULFILLED",
        payload: [35, 30, 40, 50, 70, 25, 10, 100, 43, 50, 40,2]
    }
}


export const fetchListeners = ()=>{ 
    return {
        type: "FETCH_LISTENERS_FULFILLED",
        payload: [95, 90, 60, 50, 36, 10000, 10000]
    }
}

export const fetchStreams = ()=>{ 
    return {
        type: "FETCH_STREAMS_FULFILLED",
        payload: [15, 99, 90, 71, 46, 45, 5000]
    }
}

export const fetchMaleListeners = ()=>{ 
    return {
        type: "FETCH_MALE_LISTENERS_FULFILLED",
        payload: [65, 59, 80, 81, 56, 55, 40]
    }
}

export const fetchFemaleListeners = ()=>{ 
    return {
        type: "FETCH_FEMALE_LISTENERS_FULFILLED",
        payload: [35, 30, 40, 50, 70, 25, 10]
    }
}

export const deviceLabel = ()=>{ 
    return {
        type: "DEVICE_LABEL",
        payload: ['Android', 'iOS', 'Desktop', 'Other']
    }
}

export const fetchDeviceLabel = ()=>{ 
    return {
        type: "FETCH_DEVICE_LABEL",
        payload: [80, 59, 40, 10, 0]
    }
}

export const fetchSex = ()=>{ 
    return {
        type: "FETCH_SEX",
        payload: [80, 59]
    }
}