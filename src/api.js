
const BACKEND_URL = process.env.BACKEND_URL || ''; // for cors

const api = {
    // Register login auth etc
    VALIDATE_USERNAME: BACKEND_URL+'/api/checkUsername',
    REGISTER: BACKEND_URL+'/api/register',
    LOGIN: BACKEND_URL+'/api/authenticate',
    CHECK_TOKEN: BACKEND_URL+'/checkToken',
    LOGOUT: BACKEND_URL+'/logout',

    //posts
    NEXT_POST: BACKEND_URL+'/api/nextPost',
    PREVIOUS_POST: BACKEND_URL+'/api/previousPost',
    LATEST_POST: BACKEND_URL+'/api/lastPost',
    SAVE_POST: BACKEND_URL+'/api/savePost'


}


export default api;