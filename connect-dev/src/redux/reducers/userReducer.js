import axios from "axios";

//INITIAL STATE
let initialState = {
  isLoading: false,
  users: [],
  currentUser: [],
  name: "",
  userId: 0,
  authID: "",
  userType: 0,
  companyName: "",
  posts: [],
  userPosts: [],
  employerPosts: [],
  experience: 0,
  postDate: "",
  currentUserConnections: 0,
  userNotifications: 0,
  userTypeEdit: false,
  userPortfolioEdit: false,
  userBioEdit: false,
  userExperienceEdit: false,
  userCompanyNameEdit: false,
  userBirthdayEdit: false,
  userLocationEdit: false,
  menuFlag: false,
  allUsers: []
};

//ACTION TYPE
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = "LOGOUT";
const GET_USERS = "GET_USERS";
const GET_POSTS = "GET_POSTS";
const GET_EMPLOYERS_POSTS = "GET_EMPLOYERS_POSTS";
const NEW_POST = "NEW_POST";
const GET_ALL_USERS = "GET_ALL_USERS";
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const GET_USER_POSTS = "GET_USER_POSTS";
const DELETE_POST = "DELETE_POST";
const CONNECT_WITH_USER = "CONNECT_WITH_USER";
const GET_CONNECTION_COUNT = "GET_CONNECTION_COUNT";
const SEND_USER_NOTIFICATION = "SEND_USER_NOTIFICATION";
const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
const SEND_EMAIL = "SEND_EMAIL";
const TOGGLE_USER_TYPE_EDIT = "TOGGLE_USER_TYPE_EDIT";
const TOGGLE_USER_BIO_EDIT = "TOGGLE_USER_TYPE_EDIT";
const TOGGLE_USER_PORTFOLIO_EDIT = "TOGGLE_USER_PORTFOLIO_EDIT";
const TOGGLE_USER_EXPERIENCE_EDIT = "TOGGLE_USER_EXPERIENCE_EDIT";
const TOGGLE_USER_COMPANY_NAME_EDIT = "TOGGLE_USER_COMPANY_NAME_EDIT";
const TOGGLE_USER_BIRTHDAY_EDIT = "TOGGLE_USER_BIRTHDAY_EDIT";
const TOGGLE_USER_LOCATION_EDIT = "TOGGLE_USER_LOCATION_EDIT";
const TOGGLE_MENU_FLAG = "TOGGLE_MENU_FLAG";

//ACTION CREATOR
export function loginUser() {
  return {
    type: LOGIN_USER,
    payload: axios.get(`/api/user`)
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: axios.get("/api/logout")
  };
}

export function getUsers() {
  return {
    type: GET_USERS,
    payload: axios.get('/api/getUsers')
  }
}

export function getPosts() {
  return {
    type: GET_POSTS,
    payload: axios.get("/api/getPosts")
  };
}

export function getEmployersPosts() {
  return {
    type: GET_EMPLOYERS_POSTS,
    payload: axios.get("/api/getEmployersPosts")
  };
}

export function newPost(id, post) {
  return {
    type: NEW_POST,
    payload: axios.post("/api/newPost", { id, post })
  };
}

export function getAllUsers(id) {
  return {
    type: GET_ALL_USERS,
    payload: axios.get(`/api/getAllUsers/${id}`)
  };
}

export function updateUserInfo(
  id,
  user_type,
  birthdate,
  bio,
  experience,
  location,
  company,
  portfolio
) {
  return {
    type: UPDATE_USER_INFO,
    payload: axios.put(`/api/updateUserInfo/${id}`, {
      user_type,
      birthdate,
      bio,
      experience,
      location,
      company,
      portfolio
    })
  };
}

export function getUserPosts(id) {
  return {
    type: GET_USER_POSTS,
    payload: axios.get(`/api/getUserPosts/${id}`)
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    payload: axios.delete(`/api/deletePost/${id}`)
  };
}

export function connectWithUser(id, connectorId) {
  return {
    type: CONNECT_WITH_USER,
    payload: axios.post(`/api/connectWithUser/${id}`, { connectorId })
  };
}

export function getConnectionCount(id) {
  return {
    type: GET_CONNECTION_COUNT,
    payload: axios.get(`/api/getConnectionCount/${id}`)
  };
}

export function sendUserNotification(id) {
  return {
    type: SEND_USER_NOTIFICATION,
    payload: axios.put(`/api/sendNotification/${id}`)
  };
}

export function getNotifications(id) {
  return {
    type: GET_NOTIFICATIONS,
    payload: axios.get(`/api/getNotifications/${id}`)
  };
}

export function sendEmail(
  recieverEmail,
  recieverName,
  recieverID,
  senderEmail,
  senderName,
  senderLocation,
  link
) {
  return {
    type: SEND_EMAIL,
    payload: axios.post("/api/sendMail", {
      recieverEmail,
      recieverName,
      recieverID,
      senderEmail,
      senderName,
      senderLocation,
      link
    })
  };
}

export function toggleUserTypeEdit() {
  return {
    type: TOGGLE_USER_TYPE_EDIT
  };
}

export function toggleUserPortfolioEdit() {
  return {
    type: TOGGLE_USER_PORTFOLIO_EDIT
  };
}

export function toggleUserBioEdit() {
  return {
    type: TOGGLE_USER_BIO_EDIT
  };
}

export function toggleExperienceEdit() {
  return {
    type: TOGGLE_USER_EXPERIENCE_EDIT
  };
}

export function toggleCompanyNameEdit() {
  return {
    type: TOGGLE_USER_COMPANY_NAME_EDIT
  };
}

export function toggleUserBirthdayEdit() {
  return {
    type: TOGGLE_USER_BIRTHDAY_EDIT
  };
}

export function toggleUserLocationEdit() {
  return {
    type: TOGGLE_USER_LOCATION_EDIT
  };
}

export function toggleMenuFlag() {
  return {
    type: TOGGLE_MENU_FLAG
  };
}

//REDUCER
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${LOGIN_USER}_FULFILLED`:
      const { data } = action.payload;
      return {
        ...state,
        currentUser: data,
        name: data.first_name,
        userId: data.user_id,
        email: data.email,
        profilePic: data.profile_picture,
        bio: data.bio,
        birthdate: toString(data.birthdate),
        companyName: data.company_name
      };
    case `${LOGOUT}_FULFILLED`:
      return { ...initialState };
    case `${GET_POSTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_POSTS}_FULFILLED`:
      return { ...state, posts: action.payload.data, isLoading: false };
    case `${GET_EMPLOYERS_POSTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_EMPLOYERS_POSTS}_FULFILLED`:
      return { ...state, employerPosts: action.payload.data, isLoading: false };
    case `${NEW_POST}_FULFILLED`:
      return { ...state, posts: action.payload.data };
    case `${GET_ALL_USERS}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_ALL_USERS}_FULFILLED`:
      return { ...state, users: action.payload.data, isLoading: false };
    case `${GET_USER_POSTS}_FULFILLED`:
      return { ...state, userPosts: action.payload.data };
    case `${DELETE_POST}_FULFILLED`:
      return { ...state, posts: action.payload.data };
    case `${GET_NOTIFICATIONS}_FULFILLED`:
      return { ...state, userNotifications: action.payload.data };
    case `${GET_CONNECTION_COUNT}_FULFILLED`:
      return { ...state, currentUserConnections: action.payload.data };
    case "TOGGLE_USER_TYPE_EDIT":
      return {
        ...state,
        userTypeEdit: !state.userTypeEdit,
        userPortfolioEdit: !state.userPortfolioEdit,
        userCompanyNameEdit: !state.userCompanyNameEdit,
        userLocationEdit: !state.userLocationEdit,
        userBioEdit: !state.userBioEdit,
        userBirthdayEdit: !state.userBirthdayEdit,
        userExperienceEdit: !state.userExperienceEdit
      };
    case "TOGGLE_MENU_FLAG":
      return { ...state, menuFlag: !state.menuFlag };
    case `${GET_USERS}_FULFILLED` :
      return { ...state, allUsers: action.payload.data }
    default:
      return state;
  }
}
