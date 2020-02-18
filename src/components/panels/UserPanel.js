import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../../redux/userRedux/actions/logout';

class UserPanel extends React.Component {

  state = {
    display: 'none',
    user: {
      username: ''
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3004/users', {
      headers: {
        'securityTokenValue': this.props.token,
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status && resp.status !== 200) return;

        this.setState({
          user: resp
        })
      })
  }

  handleClick = () => {
    const display = this.state.display === 'none' ? 'block' : 'none';
    this.setState({
      display
    })
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.token);
    this.props.history.push('/');
  }

  render() {
    const { user } = this.state;
    return (

      <div className="navbar__account-container" onClick={this.handleClick}>
        <div className="navbar__account" >
          <span className="navbar__login-text">Jesteś zalogowany <br /> jako, {user.username}</span>
          <img className="navbar__photo" src={`http://localhost:3004/users/${user.id}/avatar`} alt={user.username + "avatar"} />

        </div>
        <div className="account-panel__list">
          <Link className="account-panel__list-item" style={{ display: this.state.display }} to={`/user/${user.id}`}>
            Twój profil
          </Link>
          <Link className="account-panel__list-item" style={{ display: this.state.display }} to={`/user/edit/${user.id}`}>
            Edytuj profil
          </Link>
          <button className="account-panel__list-item" style={{ display: this.state.display }} onClick={this.handleLogout}>
            Wyloguj
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: token => dispatch(logoutUser(token))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserPanel))