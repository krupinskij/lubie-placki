import React from 'react'
import queryString from 'query-string'

import RecipesList from '../RecipesList';

class HomePage extends React.Component {
	state = {
		recipes: [],
		type: ""
	}

	fetchData = (parsed = queryString.parse(this.props.history.location.search)) => {

		this.setState({
			type: parsed.type
		})

		fetch("http://localhost:3004/recipes" + (parsed.type ? `?type=${parsed.type}` : ''))
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					recipes: resp
				})
			})
	}

	componentDidUpdate = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		if(this.state.type!==parsed.type) this.fetchData(parsed);
	}

	componentDidMount = () => {
		this.fetchData();
	}

	

	render() {
		return(
			<RecipesList recipes={this.state.recipes}/>
		)
	}
}

export default HomePage;