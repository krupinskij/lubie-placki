import React from 'react';
import Recipe from './Recipe';

class RecipePage extends React.Component {

    state = {
        recipe: {},
        loading: true
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;

        fetch("http://localhost:3004/recipes/" + id)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    recipe: resp,
                    loading: false
                })
            })
    }

    render() {

        if(this.state.loading) return(<div>Loading...</div>)

        return(
            <div className="page">
                <Recipe recipe={this.state.recipe}/>
            </div>
        )
    }
}

export default RecipePage