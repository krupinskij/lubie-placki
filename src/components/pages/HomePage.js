import React from 'react'
import queryString from 'query-string'

import RecipesList from '../RecipesList';
import PageController from '../PageController';

import {withRouter} from 'react-router-dom';

class HomePage extends React.Component {
	state = {
		type: 'all',
		page: 1,
		length: 1
	}

	fetchQuery = parsed => {
		const type = parsed.type !== undefined ? parsed.type : 'all';
		const page = parsed.page !== undefined ? parsed.page : 1;
		this.setState({ type, page })

		fetch("http://localhost:3004/recipes/pages?type=" + type)
		.then(resp => resp.json())
		.then(length => { this.setState({ length }) })

	}

	componentWillReceiveProps = nextProps => {
		const parsed = queryString.parse(nextProps.location.search);
		this.fetchQuery(parsed);
	}

	componentDidMount = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		this.fetchQuery(parsed);
	}

	handleChangePage = (event, page) => {
		this.props.history.push('/?type=' + this.state.type + '&page=' + page);
	}
	
	render() {
		return(
			<div className="page">
				<RecipesList
					type={ this.state.type }
					page={ this.state.page }
				/>
				<PageController
					length={this.state.length}
                    currentPage={this.state.page} 
                    choosePage={this.handleChangePage}
                />
			</div>
		)
	}
}

export default withRouter(HomePage);