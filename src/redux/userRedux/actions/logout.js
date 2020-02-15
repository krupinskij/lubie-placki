import { 
    LOGOUT_REQUEST 
} from '../constants/logoutConstants';

import history from '../../../helpers/history';

export const logoutUser = () => {
    localStorage.removeItem('user');
    history.push("/");
    window.location.reload(false);

    return { type: LOGOUT_REQUEST };
}