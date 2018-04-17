import axios from 'axios';

//INITIAL STATE
let initialState = {
    isLoading: false,
    users: [],
    currentUser: [],
    name: "",
    authID: "",
    // birthdate: '',
    // newBio: "",
    // bio: "",
    userType: 0,
    companyName: "",
    posts: [],
    // email: "",
    experience: 0,
    // city: "",
    // state: "",
    // country: "",
    postDate: "",
    postLikes: 0,
    // profilePic: ""
}

//ACTION TYPE
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT = 'LOGOUT';
const ENTER_BIO = 'ENTER_BIO';
const CHANGE_BIO = 'CHANGE_BIO';
const GET_POSTS = 'GET_POSTS';
const NEW_POST = 'NEW_POST';
const GET_ALL_USERS = 'GET_ALL_USERS';
const CHOOSE_USER_TYPE = 'CHOOSE_USER_TYPE';
const CHOOSE_USER_EXPERIENCE = 'CHOOSE_USER_EXPERIENCE';
const ENTER_BIRTHDATE = 'ENTER_BIRTHDATE';
const ENTER_LOCATION = 'ENTER_LOCATION';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

//ACTION CREATOR
export function loginUser() {
    return {
        type: LOGIN_USER,
        payload: axios.get(`/api/user`)
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: axios.get('/api/logout')
    }
}

export function getPosts() {
    return {
        type: GET_POSTS,
        payload: axios.get('/api/getPosts')
    }
}
export function newPost(id, post) {
    return {
        type: NEW_POST,
        payload: axios.post('/api/newPost', {id, post})
    }
}

export function getAllUsers(id) {
    return {
        type: GET_ALL_USERS,
        payload: axios.get(`/api/getAllUsers/${id}`)
    }
}

export function updateUserInfo(id, user_type, birthdate, bio, experience, location, company) {
    return{
        type: UPDATE_USER_INFO,
        payload: axios.put(`/api/updateUserInfo/${id}`, { user_type, birthdate, bio, experience, location, company })
    }
}

//REDUCER
export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case `${LOGIN_USER}_FULFILLED` :
        const { data } = action.payload;
        return { ...state, currentUser: data, name: data.first_name, email: data.email, profilePic: data.profile_picture, bio: data.bio, birthdate: toString(data.birthdate), companyName: data.company_name }
        case LOGOUT :
        return { ...state, currentUser: [] }
        case `${GET_POSTS}_FULFILLED` :
        // console.log(action.payload.data)
        return { ...state, posts: action.payload.data }
        case `${NEW_POST}_FULFILLED` :
        // console.log(state, action.payload.data)
        return { ...state, posts: action.payload.data }
        case `${GET_ALL_USERS}_FULFILLED` :
        return { ...state, users: action.payload.data }
        default: state;
    }
};