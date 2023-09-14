import axios from 'axios';


const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('access_token')
    ? `Bearer ${localStorage.getItem('access_token')}`
    : null,
};
const secondHeaders = {
  Accept: 'multipart/form-data',
  'Content-Type': 'multipart/form-data',
  Authorization: localStorage.getItem('access_token')
    ? `Bearer ${localStorage.getItem('access_token')}`
    : null,
};
const thardHeaders = {
  Accept: 'multipart/form-data',
 'Content-Type': 'multipart/form-data',
  responseType: 'blob',
  Authorization: localStorage.getItem('access_token')
    ? `Bearer ${localStorage.getItem('access_token')}`
    : null,
};

const defaultPath = 'http://127.0.0.1:8000/api';

export default {
  async get(url) {
    try {
      const res = await axios.get(`${defaultPath}/${url}`, {
        headers: defaultHeaders,
      });
      return res;
    } catch (err) {
      return { error: err };
    }
  },

  post(url) {
    return {
      values: async (data) => {
        if (data.entity) {
          data = data.entity;
        }
        try {
          const res = await axios.post(`${defaultPath}/${url}`, data, {
            headers: defaultHeaders,
          });

          console.log(res)
          return res;
        } catch (err) {
          return err;
        }
      },
    };
  },

  update(url) {
    return {
      values: async (data) => {
        try {
          const res = await axios.post(`${defaultPath}/${url}`, data.entity, {
            headers: defaultHeaders,
          });
          return res;
        } catch (err) {
          return { error: err.response.data.errors };
        }
      },
    };
  },

  put(url, id) {
    return {
      values: async (data) => {
        try {
          const res = await axios.put(`${defaultPath}/${url}/${id}`, data, {
            headers: defaultHeaders,
          });
          return res;
        } catch (err) {
          return { error: err.response.data.errors };
        }
      },
    };
  },

  async delete(url) {
    try {
      const res = await axios.delete(`${defaultPath}/${url}`, {
        headers: defaultHeaders,
      });
      return res;
    } catch (err) {
      return { error: err.response.data.errors };
    }
  },
  upload(url) {
    return {
      values: async (data) => {
        if (data.entity) {
          data = data.entity;
        }

        try {
          const res = await axios.post(`${defaultPath}/${url}`, data, {
            headers: secondHeaders,
          });
          // console.log('File uploaded:', response.data);
          return res;
        } catch (err) {
          return err;
        }
      },
    };
  },
  async fetchImage(url) {
    try {
      const res = await axios.get(`${defaultPath}/${url}`, {
        headers: thardHeaders,
      });
      return res;
    } catch (err) {
      return { error: err };
    }
  },
};
