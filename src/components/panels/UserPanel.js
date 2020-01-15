import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../../redux/actions/logoutActions';


import FA from 'react-fontawesome'

class UserPanel extends React.Component {

  state = {
    display: 'none'
  }

  handleClick = () => {
    const display = this.state.display==='none' ? 'block' : 'none';
    this.setState({
      display
    })
  }

  handleLogout = () => {

    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    const { user } = this.props;
    return (

      <div className="navbar__account-container" onClick={this.handleClick}>
				<div className="navbar__account" >
					<span className="navbar__login-text">Jesteś zalogowany <br/> jako, {user.username}</span> 
					<FA className="navbar__login-icon" name="user-circle" />
				</div>
        <div className="account-panel__list">
          <Link className="account-panel__list-item" style={{display: this.state.display}} to={`/user/${user.id}`}>
            Twój profil
          </Link>
          <button className="account-panel__list-item" style={{display: this.state.display}} onClick={this.handleLogout}>
            Wyloguj
          </button>
        </div>
			</div>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserPanel))