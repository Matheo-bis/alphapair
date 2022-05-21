import axios from "axios";
import ContentService from "./ContentService";

const GROUPS_URL = "http://localhost:8080/api/v1/promotions";
const SET_LOCKED_URL = "http://localhost:8080/api/v1/groups";

class GroupService {

    getPromotionGroups = (promotionId, callback) => {
        axios.get(GROUPS_URL + "/" + promotionId + "/groups")
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.getPromotionGroups, callback, promotionId);
            }
        });
    }

    setGroupLocked = (body, callback) => {
        axios.put(SET_LOCKED_URL + "/" + body.groupId + "/setlocked", body.isLocked)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.setGroupLocked, callback, body);
            }
        });
    }

}

export default new GroupService();