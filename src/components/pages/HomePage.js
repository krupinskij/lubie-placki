import React from 'react'
import queryString from 'query-string'

import RecipesList from '../RecipesList';

class HomePage extends React.Component {
	state = {
		recipes: [],
		type: ""
	}

	fetchData = (parsed = queryString.parse(this.props.history.location.search)) => {

		this.setState({
			type: parsed.type
		})

		fetch("http://localhost:3004/recipes" + (parsed.type ? `?type=${parsed.type}` : ''))
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					recipes: resp
				})
			})
	}

	componentDidUpdate = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		if(this.state.type!==parsed.type) this.fetchData(parsed);
	}

	componentDidMount = () => {
		this.fetchData();
	}

	

	render() {
		return(
			<div className="page">
				<RecipesList recipes={this.state.recipes}/>
			</div>
		)
	}
}

export default HomePage;

// import React from 'react'
// import queryString from 'query-string'
// import { connect } from 'react-redux'

// import RecipesList from '../RecipesList';

// import { loadRecipes } from '../../redux/actions/loadRecipes'

// class HomePage extends React.Component {

// 	constructor(props) {
// 		super(props);
// 	}

// 	state = {
// 		type: null
// 	}

// 	setType = (type) => {
// 		this.setState({ type: type }, () => {
// 			//this.props.loadRecipes(type);
// 		});
// 	}

// 	componentDidMount() {
// 		this.props.loadRecipes("");
// 	}

// 	componentDidUpdate = () => {
// 		let type = queryString.parse(this.props.history.location.search).type;
// 		if (!type) type = "";

// 		if (this.state.type !== type) this.setState({ type: type });
// 	}

// 	render() {
// 		const { isLoading, recipes } = this.props;

// 		if (isLoading) {
// 			return <p>Loading ...</p>
// 		}

// 		return (
// 			<RecipesList recipes={recipes.filter(recipe => recipe.type.startsWith(this.state.type))} />
// 		)

// 	}
// }

// // const mapStateToProps = (state /*, ownProps*/) => {
// // 	console.log(state)
// // 	return {
// // 		recipes: state.recipes,
// // 		isLoading: state.loading
// // 	}
// // }

// // const mapDispatchToProps = (dispatch) => ({
// // 	loadRecipes: (type) => dispatch(loadRecipes(type))
// // })

// // export default connect(
// // 	mapStateToProps,
// // 	mapDispatchToProps
// // )(HomePage)