// we need a base path that we can use to refer our requests to the location of our routes
import sendRequest from './send-request';
import * as usersAPI from './users-api';
const BASE_URL = 'https://couch-potato-api.onrender.com/api/users'
//const BASE_URL = '/api/users'


export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
  }
  
export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  }

export function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
      // checkToken returns a string, but let's 
      // make it a Date object for more flexibility
      .then(dateStr => new Date(dateStr));
  }