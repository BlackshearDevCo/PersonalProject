import axios from 'axios';

//INITIAL STATE
let initialState = {
    isLoading: false,
    users: [],
    currentUser: [],
    name: "",
    authID: "",
    birthdate: "",
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

//REDUCER
export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case `${LOGIN_USER}_FULFILLED` :
        const { data } = action.payload;
            return { ...state, currentUser: data, name: data.first_name, email: data.email, profilePic: data.profile_picture }
        case '${LOGOUT}' :
            return { ...state, currentUser: [] }
        default: state;
    }
};