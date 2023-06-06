import axios from "axios";
import ContentService from "./ContentService";
import Protocol from "./Protocol";

const GROUPS_URL = Protocol.ADDRESS+"/api/v1/promotions";
const SET_LOCKED_URL = Protocol.ADDRESS+"/api/v1/groups";
const SET_CHOICES_URL = Protocol.ADDRESS+"/api/v1/groups";

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

    getGroup = (groupId, callback) => {
        axios.get("/groups/" + groupId)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.getGroup, callback, groupId);
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

    setGroupChoices = (body, callback) => {
        axios.put(SET_CHOICES_URL + "/" + body.groupId + "/setchoices", body)
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.setGroupChoices, callback, body);
            }
        });
    }

}

export default new GroupService();