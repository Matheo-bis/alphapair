import axios from "axios";
import ContentService from "./ContentService";

const GROUPS_URL = "http://localhost:8080/api/v1/promotions";

class GroupService {

    getPromotionGroups = (promotionId, callback) => {
        axios.get(GROUPS_URL + "/" + promotionId + "/groups")
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.getPromotionGroups, callback, null);
            }
        });
    }

}

export default new GroupService();