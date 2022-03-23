import axios from "axios";
import Protocol from "./Protocol";

const SIGNUP_URL = "http://localhost:8080/api/v1/signup";
const LOGIN_URL = "http://localhost:8080/api/v1/login";
const IS_LOGGED_URL = "http://localhost:8080/api/v1/islogged";
const LOGOUT_URL = "http://localhost:8080/api/v1/logout";

class UserService {
    userSignup(user, history) {
        axios.post(SIGNUP_URL, user).then((res) => {
            if (res.data === Protocol.REPLY_OK) {
                history("/login");
            } else if (res.data === Protocol.REPLY_DB_ERROR) {
                window.location.reload(false);
            } else if (res.data === Protocol.REPLY_AUTH_ERROR) {
                history("/home");
            }
        });
    }

    userLogin(user, history) {
        axios.post(LOGIN_URL, user).then((res) => {
            if (res.data === Protocol.REPLY_OK) {
                history("/home");
            } else if (res.data === Protocol.REPLY_DB_ERROR) {
                window.location.reload(false);
            } else if (res.data === Protocol.REPLY_AUTH_ERROR) {
                history("/home");
            }
        });
    }

    userIsLogged(history) {
        axios.get(IS_LOGGED_URL).then((res) => {
            if (res.data === Protocol.REPLY_OK)
                history('/home');
        })
    }

    userLogout(history) {
        axios.get(LOGOUT_URL).then((res) => {
            history('/login');
        });
    }
}

export default new UserService();