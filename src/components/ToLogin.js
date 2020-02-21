import React from 'react'

import { Link } from 'react-router-dom';

class ToLogin extends React.Component {
    render() {
        return(
            <div className="page">
                <div className="component component--wide">
                    <h2 className='form__header'>Musisz być zalogowany!</h2>
                    
                    <span className='form__direction'>Masz już konto? <Link className='form__link' to='/login'>Zaloguj się!</Link></span>
                    <span className="form__direction">Nie masz jeszcze konta? <Link className="form__link" to="/register">Zarejestruj się!</Link></span>
                </div>
            </div>
        )
    }
}

export default ToLogin;