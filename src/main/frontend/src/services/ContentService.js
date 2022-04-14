import axios from "axios";
import Protocol from "./Protocol";

const GET_CONTENT_URL = "http://localhost:8080/api/v1/content";
const GET_NEW_TOKENS_URL = "http://localhost:8080/api/v1/getnewtokens";

class ContentService {
    getContent(history) {
        axios.get(GET_CONTENT_URL)
        .then((res) => {
            console.log("CONTENT OK :");
            console.log(res.data);
            console.log(res.status);
            return res.data;
        }).catch((err) => {
            console.log("CONTENT KO");
            if (err.response) {
                if (err.response.data === Protocol.MISSING_TOKEN) {
                    history("/login");
                } else if (err.response.data === Protocol.INVALID_TOKEN) {
                    history("/login");
                } else if (err.response.data === Protocol.EXPIRED_TOKEN) {
                    // request new accessToken
                    axios.get(GET_NEW_TOKENS_URL)
                    .then(() => {
                        console.log("TOKEN OK");
                        return this.getContent(history);
                    }).catch((err) => {
                        console.log("TOKEN KO");
                        if (err.response) {
                            history("/login");
                        }
                    })
                    
                }
            }
        })
    }
}

export default new ContentService();