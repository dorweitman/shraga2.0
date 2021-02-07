import axios from 'axios';

import config from '../config';

const { userService } = config;
const { url, personRoute } = userService;

const getPerson = (id: string) => {
    return axios.get(`${url}/${personRoute}/${id}`);
};

export default getPerson;
