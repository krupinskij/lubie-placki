import React from 'react';
import queryString from 'query-string'

import { withRouter } from 'react-router-dom';

import SortController from '../SortController';
import RecipesList from '../RecipesList';
import PageController from '../PageController';

class TopPage extends React.Component {
	state = {
		recipes: [],
		sort: "",
		page: ""
	}

	fetchData = parsed => {

		this.setState({
			sort: parsed.sort ? parsed.sort : '',
			page: parsed.page ? parsed.page : 1,
		})
		
		fetch("http://localhost:3004/recipes?" + 
			(parsed.sort ? `sort=${parsed.sort}&` : '') +
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

	handleSelectChange = event => {
		this.props.history.push("/top?sort=" + event.target.value)
	}

	handleChangePage = (event, page) => {
		this.props.history.push("/top?page=" + page + (this.state.sort ? '&sort=' + this.state.sort : ''));
	}

	render() {
		return(
			<div className="page">
				<SortController chooseSort={this.handleSelectChange}/>
				<RecipesList recipes={this.state.recipes}/>
				<PageController currentPage={this.state.page} choosePage={this.handleChangePage}/>
			</div>
		)
	}
}

export default withRouter(TopPage);