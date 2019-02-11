
const BACKEND_URL = process.env.BACKEND_URL || ''; // for cors

const api = {
    // Register
    VALIDATE_USERNAME: BACKEND_URL+'/api/checkUsername',
    REGISTER: BACKEND_URL+'/api/register';
    

}


export default api;