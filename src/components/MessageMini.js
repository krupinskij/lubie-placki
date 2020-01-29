import React from 'react'
import {withRouter} from 'react-router-dom';

class MessageMini extends React.Component {

    showMessage = () => {
        this.props.history.push("/message/" + this.props.message.id)
    }

    render() {
        const message = this.props.message;
        return(
            <div className="mini-message" onClick={this.showMessage}>
                <h2>{message.title} </h2>
                <div>od {message.sender.username}</div>
                <div>do {message.receiver.username}</div>
                <div>{message.date}</div>
            </div>
        )
    }
}

export default withRouter(MessageMini)