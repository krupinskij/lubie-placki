import React from 'react'
import queryString from 'query-string'

import RecipesList from '../RecipesList';
import PageController from '../PageController';

import {withRouter} from 'react-router-dom';

class HomePage extends React.Component {
	state = {
		recipes: [],

		type: '',
		page: ''
	}

	fetchData = parsed => {

		this.setState({
			type: parsed.type ? parsed.type : '',
			page: parsed.page ? parsed.page : 1,
		})
		
		fetch("http://localhost:3004/recipes?" + 
			(parsed.type ? `type=${parsed.type}&` : '') +
			"page=" + (parsed.page ? parsed.page : 1))
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					recipes: resp
				})
			})
	}

	componentWillReceiveProps = nextProps => {
		const parsed = queryString.parse(nextProps.location.search);
		this.fetchData(parsed);
	}

	componentDidMount = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		this.fetchData(parsed);
	}

	handleChangePage = (event, page) => {
		this.props.history.push("/?page=" + page + (this.state.type ? '&type=' + this.state.type : ''));
	}
	
	render() {
		return(
			<div className="page">
				<RecipesList recipes={this.state.recipes}/>
				<PageController currentPage={this.state.page} choosePage={this.handleChangePage}/>
			</div>
		)
	}
}

export default withRouter(HomePage);