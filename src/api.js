
const API_URL = process.env.REACT_APP_API_URL || ''; // for cors



const api = {
    // Register login auth etc
    VALIDATE_USERNAME: API_URL+'/api/checkUsername',
    REGISTER: API_URL+'/api/register',
    LOGIN: API_URL+'/api/authenticate',
    CHECK_TOKEN: API_URL+'/api/checkToken',
    LOGOUT: API_URL+'/api/logout',

    //posts
    NEXT_POST: API_URL+'/api/nextPost',
    PREVIOUS_POST: API_URL+'/api/previousPost',
    LATEST_POST: API_URL+'/api/lastPost',
    SAVE_POST: API_URL+'/api/savePost'


}


export default api;