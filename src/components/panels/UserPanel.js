import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../../redux/actions/logoutActions';

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
          <img className="navbar__photo" src={`http://localhost:3004/users/${user.id}/avatar`} alt={user.username + "avatar"}/>
					
				</div>
        <div className="account-panel__list">
          <Link className="account-panel__list-item" style={{display: this.state.display}} to={`/user/${user.id}`}>
            Twój profil
          </Link>
          <Link className="account-panel__list-item" style={{display: this.state.display}} to={`/edit/${user.id}`}>
            Edytuj profil
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