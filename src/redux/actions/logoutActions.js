import { USER_LOGOUT } from '../constants/logoutConstants';

export const logoutUser = () => {
    console.log("aaaab")
    localStorage.removeItem('user');
    return { type: USER_LOGOUT };
}