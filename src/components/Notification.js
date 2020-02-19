import React from 'react';

class Notification extends React.Component {

    render() {
        const notification = this.props.notification;

        return(
            <div className={notification.result==='success' ? 'notification notification--success' : 'notification notification--error'}>
                {notification.message}
            </div>
        )
    }
}

export default Notification;