import React from 'react';

class RandomPage extends React.Component {
	componentDidMount = () => {

		console.log(this.state);
		console.log(this.props)
		
	}
	render() {
		return (
			<div>Random Recipe</div>
		)
	}
}

export default RandomPage