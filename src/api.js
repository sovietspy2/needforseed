
const API_URL = process.env.REACT_APP_API_URL || ''; // for cors



const api = {
    // Register login auth etc
    VALIDATE_USERNAME: API_URL+'/checkUsername',
    REGISTER: API_URL+'/register',
    LOGIN: API_URL+'/authenticate',
    CHECK_TOKEN: API_URL+'/checkToken',
    LOGOUT: API_URL+'/logout',

    //posts
    NEXT_POST: API_URL+'/nextPost',
    PREVIOUS_POST: API_URL+'/previousPost',
    LATEST_POST: API_URL+'/lastPost',
    SAVE_POST: API_URL+'/savePost',
    LIKE_POST: API_URL+'/likePost',
    SAVE_COMMENT: API_URL+'/saveComment',
    LOAD_COMMENTS: API_URL+'/loadComments',
    LOAD_POST_BY_ID: API_URL+'/loadPost',
    LOAD_PAGINATED_POSTS: API_URL+'/loadPosts'


}


export default api;