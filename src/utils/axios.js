import axios from 'axios'
// eslint-disable-next-line new-cap
export const Axios = new axios.create({ baseURL: 'http://api.openweathermap.org/data/2.5/' })
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2ecbeb40e4b4b68c7dbe30da741a0cdf
