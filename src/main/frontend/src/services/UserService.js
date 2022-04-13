import axios from "axios";
import Protocol from "./Protocol";

const SIGNUP_URL = "http://localhost:8080/api/v1/signup";
const LOGIN_URL = "http://localhost:8080/api/v1/login";
const IS_LOGGED_URL = "http://localhost:8080/api/v1/islogged";
const LOGOUT_URL = "http://localhost:8080/api/v1/logout";

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

    userLogout(history) {
        axios.get(LOGOUT_URL)
        .then(() => {
            history('/login');
        });
    }
}

export default new UserService();