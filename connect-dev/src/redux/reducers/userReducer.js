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
    experience: "",
    city: "",
    state: "",
    country: "",
    postDate: "",
    postLikes: 0,
    profilePic: "",

}

//ACTION TYPE
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT = 'LOGOUT';
const ENTER_BIO = 'ENTER_BIO';
const CHANGE_BIO = 'CHANGE_BIO';

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

//REDUCER
export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case `${LOGIN_USER}_FULFILLED` :
        const { data } = action.payload;
            return { ...state, currentUser: data, name: data.first_name, email: data.email, profilePic: data.profile_picture }
        case LOGOUT :
            return { ...state, currentUser: [] }
        case ENTER_BIO :
            return { ...state, newBio: action.payload }
        case `${CHANGE_BIO}_FULFILLED` :
            return { ...state, bio: action.payload.data[0].bio}
        default: state;
    }
};