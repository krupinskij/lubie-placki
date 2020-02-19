import React from 'react';

import RecipesList from '../RecipesList';
import SearchController from '../SearchController';
import PageController from '../PageController';

import queryString from 'query-string'

import { withRouter } from 'react-router-dom';

class SearchPage extends React.Component {

    state = {
        search: 'ddd',
        page: 1,
		length: 1
    }

    fetchQuery = parsed => {
		this.setState({
			search: parsed.s !== undefined ? parsed.s : '',
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
		this.props.history.push('/search?s=' + this.state.search + '&page=' + page);
	}
	
	setLength = length => {
        this.setState({ length })
    }

    render() {
        return(
            <div className="page">
                <SearchController/>
                <RecipesList
                    search={ this.state.search }
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

export default withRouter(SearchPage)