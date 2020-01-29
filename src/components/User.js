import React from 'react';

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
            </div>
		)
	}
}

export default User;