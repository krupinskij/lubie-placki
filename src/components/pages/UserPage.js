import React from 'react';
import User from '../User';

class UserPage extends React.Component {

    state = {
        user: null,
        loading: true
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;

        fetch("http://localhost:3004/users/" + id)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    user: resp,
                    loading: false
                })
            })
    }

	render() {
		if(this.state.loading) return(<div>Loading...</div>)

        return(
            <div className="page">
                <User user={this.state.user}/>
            </div>
        )
	}
}

export default UserPage;