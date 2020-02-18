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
		this.setState({
			type: parsed.type !== undefined ? parsed.type : 'all',
			page: parsed.page !== undefined ? parsed.page : 1,
		})
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
	
	setLength = length => {
        this.setState({ length })
    }
	
	render() {
		return(
			<div className="page">
				<RecipesList
					type={ this.state.type }
					page={ this.state.page }
                    setLength={ this.setLength }
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