import React from 'react';

import SortController from '../SortController';
import RecipesList from '../RecipesList';
import PageController from '../PageController';

import queryString from 'query-string'

import { withRouter } from 'react-router-dom';

class TopPage extends React.Component {
	state = {
		sort: 'date',
		page: 1,
		length: 1
	}

	fetchQuery = parsed => {
		this.setState({
			sort: parsed.sort !== undefined ? parsed.sort : 'date',
			page: parsed.page !== undefined ? parsed.page : 1,
		}, () => console.log(this.state))
	}

	componentWillReceiveProps = nextProps => {
		const parsed = queryString.parse(nextProps.location.search);
		this.fetchQuery(parsed);
	}

	componentDidMount = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		this.fetchQuery(parsed);
	}

	handleSelectChange = event => {
		this.props.history.push("/top?sort=" + event.target.value + '&page=' + this.state.page)
	}

	handleChangePage = (event, page) => {
		this.props.history.push('/top?sort=' + this.state.sort + '&page=' + page);
	}
	
	setLength = length => {
        this.setState({ length })
    }

	render() {
		return(
			<div className="page">
				<SortController chooseSort={this.handleSelectChange}/>
				<RecipesList 
					sort={ this.state.sort }
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

export default withRouter(TopPage);