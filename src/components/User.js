import React from 'react';

class User extends React.Component {
	render() {
        const user = this.props.user;
        
        return (
			<div className="component user">
                <h1 className="user__login">
                    {user.username}
                </h1>
            </div>
		)
	}
}

export default User;