export const FETCH_CP_DETAILS_FULFILLED = "FETCH_CP_DETAILS_FULFILLED"

export const fetchCpDetails = ()=>{ 
    return {
        type: "FETCH_CP_DETAILS_FULFILLED",
        payload: {
                  id: 1,
                  token: 'senmlkdjhnjnjrjmd',
                  cpName:'Tanner Linsley',
                  thumbnail: 'http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg'
                }
    }
}
