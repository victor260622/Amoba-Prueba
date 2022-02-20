import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://test.amobamed.com/api/v1/patient/';
class UserService {
  getAllPatients() {
    return axios.post(API_URL + 'all',
      {
        "doctor_id": 1,
        "company_id": 1
      },
      { headers: authHeader() });

  }
}
export default new UserService();