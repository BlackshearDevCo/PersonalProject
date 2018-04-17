import axios from 'axios';

//INITIAL STATE
let initialState = {
    isLoading: false,
    users: [],
    currentUser: [],
    name: "",
    authID: "",
    birthdate: "",
    newBio: "",
    bio: "",
    userType: 0,
    companyName: "",
    posts: [],
    email: "",
    experience: 0,
    city: "",
    state: "",
    country: "",
    postDate: "",
    postLikes: 0,
    profilePic: ""
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

//ACTION CREATOR
export function loginUser() {
    return {
        type: LOGIN_USER,
        payload: axios.get('/api/user')
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: axios.get('/api/logout')
    }
}

export function enterBio(val) {
    return {
        type: ENTER_BIO,
        payload: val
    }
}

export function changeBio(id, bio) {
    return {
        type: CHANGE_BIO,
        payload: axios.put(`/api/changeBio/${id}`, {bio})
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

export function chooseUserType(num, id) {
    return {
        type: CHOOSE_USER_TYPE,
        payload: axios.put(`/api/chooseUserType/${id}`, { num })
    }
}

export function chooseUserExperience(num, id) {
    return {
        type: CHOOSE_USER_EXPERIENCE,
        payload: axios.put(`/api/chooseUserExperience/${id}`, { num })
    }
}

export function enterBirthdate(id, birthday) {
    return {
        type: ENTER_BIRTHDATE,
        payload: axios.put(`/api/enterBirthdate/${id}`, {birthday})
    }
}

//REDUCER
export default function userReducer(state = initialState, action) {
    console.log(action)
    switch(action.type) {
        case `${LOGIN_USER}_FULFILLED` :
        const { data } = action.payload;
        return { ...state, currentUser: data, name: data.first_name, email: data.email, profilePic: data.profile_picture, bio: data.bio, birthdate: data.birthdate }
        case LOGOUT :
        return { ...state, currentUser: [] }
        case ENTER_BIO :
        return { ...state, newBio: action.payload }
        case `${CHANGE_BIO}_FULFILLED` :
        return { ...state, bio: action.payload.data[0].bio}
        case `${GET_POSTS}_FULFILLED` :
        // console.log(action.payload.data)
        return { ...state, posts: action.payload.data }
        case `${NEW_POST}_FULFILLED` :
        // console.log(state, action.payload.data)
        return { ...state, posts: action.payload.data }
        case `${GET_ALL_USERS}_FULFILLED` :
        return { ...state, users: action.payload.data }
        case `${CHOOSE_USER_TYPE}_FULFILLED` :
            return { ...state, userType: action.payload.data[0].user_type }
        case `${CHOOSE_USER_EXPERIENCE}_FULFILLED` :
            return { ...state, experience: action.payload.data[0].user_experience }
        case `${ENTER_BIRTHDATE}_FULFILLED` :
            return { ...state, birthdate: action.payload.data[0].birthdate }
        default: state;
    }
};