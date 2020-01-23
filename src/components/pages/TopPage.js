import React from 'react';
import queryString from 'query-string'

import { withRouter } from 'react-router-dom';

import SortController from '../SortController';
import RecipesList from '../RecipesList';

class TopPage extends React.Component {
	state = {
		recipes: [],
		sort: "date"
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
				}, () => { console.log(this.state.recipes)})
			})
	}

	componentDidUpdate = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		if(this.state.sort!==parsed.sort) this.fetchData(parsed);
	}

	componentDidMount = () => {
		this.fetchData();
	}

	handleSelectChange = event => {
		this.props.history.push("/top?sort=" + event.target.value)
	}

	render() {
		return(
			<div className="page">
				<SortController chooseSort={this.handleSelectChange}/>
				<RecipesList recipes={this.state.recipes}/>
			</div>
		)
	}
}

export default withRouter(TopPage);