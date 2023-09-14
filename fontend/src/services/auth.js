import api from './api';

//Cookie expire time
// const expiresAt = 86400;

const options = {
  domain: `${process.env.REACT_APP_DOMAIN}`,
  path: '/',
  // expires: new Date(Date.now() + expiresAt),
};

class AuthService {
  async doUserLogin(credentials) {
    try {
      const response = await api.post('login').values(credentials);
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async handleLoginSuccess(response) {
    localStorage.setItem("user_id", response.id);
    localStorage.setItem("user_name", response.first_name);
    localStorage.setItem("access_token", response.token);
    return true;
     
  }  

  async signOutUser() {
    await api.post('logout').values( localStorage.getItem('user_id'));

    this.clearLocalStorage().then(() => {
      window.location.reload();
    });
  }

  async clearLocalStorage() {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve();
    });
  }
}

export default new AuthService();
