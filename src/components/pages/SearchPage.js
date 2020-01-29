import React from 'react';
import queryString from 'query-string'

import RecipesList from '../RecipesList';
import SearchController from '../SearchController';

class SearchPage extends React.Component {

    state = {
        recipes: [],
        search: ""
    }

    fetchData = parsed => {

		this.setState({
			search: parsed.s
		})
		
		fetch("http://localhost:3004/recipes/search?s=" + parsed.s)
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

    render() {
        return(
            <div className="page">
                <SearchController/>
                <RecipesList recipes={this.state.recipes}/>
            </div>
        )
    }
}

export default SearchPage