import React from 'react';

import {withRouter} from 'react-router-dom'

class User extends React.Component {
    
    render() {
        const user = this.props.user;
        
        return (
			<div className="component user">
                <h1 className="user__header">
                    
                    <img className="user__photo" src={`http://localhost:3004/users/${user.id}/avatar`} alt={user.username + "avatar"}/>
                    {user.username}
                </h1>
                <div>
                    Punkty: {this.props.points}
                </div>
            </div>
		)
	}
}

export default withRouter(User);