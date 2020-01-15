import React from 'react';
import User from '../User';
import RecipesList from '../RecipesList';

class UserPage extends React.Component {

    state = {
        user: null,
        recipes: [],
        loading: true
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;

        fetch("http://localhost:3004/users/" + id)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    user: resp,
                })

                fetch("http://localhost:3004/recipes/user/" + id)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        recipes: resp,
                        loading: false
                    })
                })
            })
    }

	render() {
		if(this.state.loading) return(<div>Loading...</div>)

        return(
            <div className="page">
                <User user={this.state.user}/>
                <RecipesList recipes={this.state.recipes}/>
            </div>
        )
	}
}

export default UserPage;