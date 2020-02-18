import React from 'react';
import User from '../User';
import RecipesList from '../RecipesList';
import PageController from '../PageController';

import queryString from 'query-string'

import { withRouter } from 'react-router-dom';

class UserPage extends React.Component {

    state = {
        user: {},
        page: 1,
        length: 1
    }    
    
    componentDidMount = () => {
        const id = this.props.match.params.id;

        fetch("http://localhost:3004/users/" + id)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    user: resp
                })
            })

		const parsed = queryString.parse(this.props.history.location.search);
		this.fetchQuery(parsed);
    }

	componentWillReceiveProps = nextProps => {
		const parsed = queryString.parse(nextProps.location.search);
		this.fetchQuery(parsed);
	}

	fetchQuery = parsed => {
		this.setState({
			page: parsed.page !== undefined ? parsed.page : 1
		})
    }
    
    handleChangePage = (event, page) => {
		this.props.history.push('/user/' + this.props.match.params.id + '?page=' + page);
    }
    
    setLength = length => {
        this.setState({ length })
    }

	render() {
        return(
            <div className="page">
                <User user={this.state.user}/>
                <RecipesList
                    user_id={ this.props.match.params.id }
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

export default withRouter(UserPage);