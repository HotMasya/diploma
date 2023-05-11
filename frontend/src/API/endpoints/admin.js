// Api
import API from 'API';

async function getInitialInfo() {
  return API.instance.get('admin').then((res) => res.data);
}

const admin = {
  getInitialInfo,
};

export default admin;
