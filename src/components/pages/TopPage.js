import React from 'react';
import queryString from 'query-string'

import RecipesList from '../RecipesList';

class TopPage extends React.Component {
	state = {
		recipes: [],
		type: ""
	}

	fetchData = (parsed = queryString.parse(this.props.history.location.search)) => {

		this.setState({
			sort: parsed.sort
		})

		fetch("http://localhost:3004/recipes/sort" + (parsed.sort ? `?sort=${parsed.sort}` : ''))
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					recipes: resp
				})
			})
	}

	componentDidUpdate = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		if(this.state.sort!==parsed.sort) this.fetchData(parsed);
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

export default TopPage;