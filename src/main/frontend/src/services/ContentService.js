import axios from "axios";
import Protocol from "./Protocol";

const GET_CONTENT_URL = Protocol.ADDRESS+"/api/v1/content";
const GET_NEW_TOKENS_URL = Protocol.ADDRESS+"/api/v1/getnewtokens";

class ContentService {
    getContent = (body, callback) => {
        axios.get(GET_CONTENT_URL)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                this.handleError(err.response.data, this.getContent, callback, body);
            }
        })
    }

    handleError(errorCode, requestFunction, callback, body) {
        if (errorCode === Protocol.EXPIRED_TOKEN) {
            axios.get(GET_NEW_TOKENS_URL)
            .then(() => {
                return requestFunction(body, callback);
            }).catch((err) => {
                if (err.response) {
                    window.location.href = "/login";
                }
            })
        } else if (errorCode === Protocol.NOT_ADMIN_USER) {
            window.location.href = "/home";
        } else if (errorCode === Protocol.INVALID_ARGUMENT) {
            // do nothing
        } else if (errorCode === Protocol.PROMLESS_STUDENT) {
            window.location.href = "/join";
        } else {
            window.location.href = "/login";
        }
    }
}

export default new ContentService();