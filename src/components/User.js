import React from 'react';

import {withRouter} from 'react-router-dom'

class User extends React.Component {
    
    state = {
        points: 0
    }
    
    componentDidMount = () => {
        fetch("http://localhost:3004/users/" + this.props.user.id + "/points")
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                points: resp
            })
        })
    }

    writeMessage = () => {
        this.props.history.push("/write/" + this.props.user.id)
    }

	render() {
        const user = this.props.user;
        
        return (
			<div className="component user">
                <h1 className="user__header">
                    
                    <img className="user__photo" src={`http://localhost:3004/users/${user.id}/avatar`} alt={user.username + "avatar"}/>
                    {user.username}
                </h1>
                <div>
                    Punkty: {this.state.points}
                </div>
                <div>
                    <button className="user__button" onClick={this.writeMessage}>Napisz wiadomość</button>
                </div>
            </div>
		)
	}
}

export default withRouter(User);