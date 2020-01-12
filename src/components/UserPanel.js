import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../redux/actions/logoutActions'

class UserPanel extends React.Component {

  handleLogout = () => {

    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    const { user } = this.props;
    return (
      <div className="navbar__account-container">
        {user.login}
        <button onClick={this.handleLogout}>Wyloguj</button>
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