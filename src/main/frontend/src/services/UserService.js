import axios from "axios";
import ContentService from "./ContentService";
import Protocol from "./Protocol";

const SIGNUP_URL = "http://localhost:8080/api/v1/signup";
const LOGIN_URL = "http://localhost:8080/api/v1/login";
const IS_LOGGED_URL = "http://localhost:8080/api/v1/islogged";
const LOGOUT_URL = "http://localhost:8080/api/v1/logout";
const IS_ADMIN_URL = "http://localhost:8080/api/v1/isadmin";
const IS_STUDENT_PROMLESS_URL = "http://localhost:8080/api/v1/isstudentpromless";
const UPDATE_PROMOTION_URL = "http://localhost:8080/api/v1/users/promotion";
const UPDATE_GROUP_URL = "http://localhost:8080/api/v1/users/group";
const GET_SELF_URL = "http://localhost:8080/api/v1/users/self";
const GET_ALL_STUDENTS_URL = "http://localhost:8080/api/v1/users/students";

class UserService {
    userSignup(user, history) {
        axios.post(SIGNUP_URL, user)
        .then(() => {
            console.log("CODE 200 / OK");
            history("/login");
        }).catch((err) => {
            if (err.response) {
                if (err.response.data === Protocol.ALREADY_LOGGED_IN) {
                    console.log("already logged in.");
                    history("/home");
                } else if (err.response.data === Protocol.ALREADY_USED_MAIL) {
                    console.log("mail already used.");
                    window.location.reload(false);
                }
                return err;
            }
        });
    }

    userLogin(user, history) {
        axios.post(LOGIN_URL, user)
        .then(() => {
            console.log("CODE 200 / OK");
            history("/home");
        }).catch((err) => {
            if (err.response) {
                if (err.response.data === Protocol.ALREADY_LOGGED_IN) {
                    console.log("already logged in.");
                    history("/home");
                } else if (err.response.data === Protocol.BAD_CREDENTIALS) {
                    console.log("wrong credentials.");
                    window.location.reload(false);
                }
                return err;
            }
        });
    }

    userIsLogged(history) {
        axios.get(IS_LOGGED_URL)
        .then((res) => {
            if (res.data)
                history('/home');
        });
    }

    userLogout = () => {
        axios.get(LOGOUT_URL)
        .then(() => {
            window.location = "/login";
        });
    }

    userIsAdmin = (body, callback) => {
        axios.get(IS_ADMIN_URL)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.userIsAdmin, callback, null);
            }
        })
    }

    userIsStudentPromless = (body, callback) => {
        axios.get(IS_STUDENT_PROMLESS_URL)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.userIsStudentPromless, callback, null);
            }
        })
    }

    userUpdatePromotion = (body, callback) => {
        axios.put(UPDATE_PROMOTION_URL, body)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.userUpdatePromotion, callback, body);
            }
        })
    }

    userUpdateGroup = (body, callback) => {
        axios.put(UPDATE_GROUP_URL, body)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.userUpdateGroup, callback, body);
            }
        })
    }

    userGetSelf = (body, callback) => {
        axios.get(GET_SELF_URL)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.userGetSelf, callback, body);
            }
        })
    }

    userGetAllStudents = (body, callback) => {
        axios.get(GET_ALL_STUDENTS_URL)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.userGetAllStudents, callback, body);
            }
        })
    }
}

export default new UserService();