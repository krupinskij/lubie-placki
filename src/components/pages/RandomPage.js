import React from 'react';
import { withRouter } from 'react-router-dom';


class RandomPage extends React.Component {

	componentDidMount = () => {
		fetch("http://localhost:3004/recipes/random")
		.then(id => id.json())
		.then(id => {
			this.props.history.push(`/recipe/${id}`);
		})
	}
	
	render() {
		return (
			<div></div>
		)
	}
}

export default withRouter(RandomPage)