import axios from 'axios';

//INITIAL STATE
let initialState = {
    users: []
}

//ACTION TYPE
const GET_USERS = 'GET_USERS';

//ACTION CREATOR
export function getUsers() {
    return {
        type: GET_USERS,
        payload: axios.get('/api/test')
    }
}

//REDUCER
export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case `${GET_USERS}_FULFILLED` :
            return { ...state, users: action.payload }
        default: state;
    }
};