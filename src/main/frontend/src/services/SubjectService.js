import axios from "axios";
import ContentService from "./ContentService";

const SUBJECTS_URL = "http://localhost:8080/api/v1/promotions";

class SubjectService {

    getPromotionSubjects = (promotionId, callback) => {
        axios.get(SUBJECTS_URL + "/" + promotionId + "/subjects")
        .then((res) => callback(res.data))
        .catch((err) => {
            if (err.response) {
                ContentService.handleError(err.response.data, this.getPromotionSubjects, callback, null);
            }
        });
    }

}

export default new SubjectService();