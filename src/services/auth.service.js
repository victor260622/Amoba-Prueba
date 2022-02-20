import axios from 'axios';
const API_URL = 'http://test.amobamed.com/oauth/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'token', {
                username: user.username,
                password: user.password,
                grant_type: "password",
                client_id: "2",
                client_secret: "rDnLA1OfY8nHovztVBU8rcvOP9K5iH7LngUZNIzB",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
}
export default new AuthService();