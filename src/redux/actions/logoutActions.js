import { 
    LOGOUT_REQUEST 
} from '../constants/userConstants';

export const logoutUser = () => {
    localStorage.removeItem('user');
    return { type: LOGOUT_REQUEST };
}