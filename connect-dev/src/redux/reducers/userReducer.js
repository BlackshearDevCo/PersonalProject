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
    ProfilePic: "",

}

//ACTION TYPE
const GET_USERS = 'GET_USERS';
const LOGOUT = 'LOGOUT';

//ACTION CREATOR
export function getUsers() {
    return {
        type: GET_USERS,
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
        case `${GET_USERS}_FULFILLED` :
        console.log(action.payload.data);
            return { ...state, currentUser: action.payload.data }
        case '${LOGOUT}' :
            return { ...state, currentUser: [] }
        default: state;
    }
};