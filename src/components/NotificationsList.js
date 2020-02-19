import React from 'react';
import Notification from './Notification';

import { connect } from 'react-redux'

class NotificationsList extends React.Component {

  render() {

    const notifications = this.props.notifications.map((n,i) => <Notification key={i} notification={n}/>)

    return (
      <div>
        <div className='notifications'>
          {notifications}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps
)(NotificationsList)