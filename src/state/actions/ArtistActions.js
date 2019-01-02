export const FETCH_CP_PROFILE_FULFILLED = 'FETCH_CP_PROFILE_FULFILLED';

export const fetchCpProfile = ()=>{ 
    return {
        type: "FETCH_CP_PROFILE_FULFILLED",
        payload: {
        		  countriesreached: 10,
        	      totalcatalogues: 60000,
        	      artistcount: 50000,
        		  topperforming:[{
				                  id: 1,
				                  name:'Wizkid',
				                  tracks: 10000000,
				                  connections: 200000,
				                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
				                },
				                {
				                  id: 2,
				                  name:'CDQ',
				                  tracks: 10000000,
				                  connections:40000,
				                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
				                },
				                {
				                  id: 3,
				                  name:'CDQ',
				                  tracks: 10000000,
				                  connections:40000,
				                  thumbnail: "http://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"
				                }]
            	}
    }
}