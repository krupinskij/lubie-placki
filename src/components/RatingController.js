import React from 'react'
import star from '../svg/star.svg'

class RatingController extends React.Component {

    state = {
        average: 0,
        count: 0,

        userRating: [-1, -1]
    }

    componentDidMount = () => {
        fetch("http://localhost:3004/recipes/" + this.props.recipe.id + "/ratings")
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                average: resp[0],
                count: resp[1]
            })
        })

        if(this.props.token !== null) {
            fetch("http://localhost:3004/recipes/" + this.props.recipe.id + "/rating", {
                headers: {
                    'securityTokenValue': this.props.token
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    userRating: resp
                })
            })
        }
    }

    handlePostRating = (event, rating) => {
        if(this.props.token === null) return;

        fetch("http://localhost:3004/recipes/" + this.props.recipe.id + "/rating", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': this.props.token
            },
            body: JSON.stringify(rating)
        })
        .then(resp => { this.componentDidMount() })
    }

    handleDeleteRating = event => {
        if(this.props.token === null) return;
        if(this.state.userRating < 0) return;

        fetch("http://localhost:3004/recipes/" + this.props.recipe.id + "/rating", {
            method: 'DELETE',
            headers: {
                'securityTokenValue': this.props.token
            }
        })

        .then(() => {
            this.setState({
                userRating: -1
            })
            
            this.componentDidMount();
        })
    }

    render() {
        return (
                <div className="recipe__rating">
                    <div className="recipe__stars">
                        <img 
                            className={ this.state.average<0.5 ? "recipe__star recipe__star--low" : "recipe__star" }
                            onClick={ event => { this.handlePostRating(event, 1) } }
                            src={star} alt="1 rating star"
                        />
                        <img 
                            className={ this.state.average<1.5 ? "recipe__star recipe__star--low" : "recipe__star" }
                            onClick={ event => { this.handlePostRating(event, 2) } }
                            src={star} alt="2 rating star"
                        />
                        <img 
                            className={ this.state.average<2.5 ? "recipe__star recipe__star--low" : "recipe__star" }
                            onClick={ event => { this.handlePostRating(event, 3) } }
                            src={star} alt="3 rating star"
                        />
                        <img 
                            className={ this.state.average<3.5 ? "recipe__star recipe__star--low" : "recipe__star" }
                            onClick={ event => { this.handlePostRating(event, 4) } }
                            src={star} alt="4 rating star"
                        />
                        <img 
                            className={ this.state.average<4.5 ? "recipe__star recipe__star--low" : "recipe__star" }
                            onClick={ event => { this.handlePostRating(event, 5) } }
                            src={star} alt="5 rating star"
                        />
                    </div>
                    <div className="recipe__rating-description">
                        ({this.state.average.toFixed(2)}/5) : {this.state.count} głosów 
                        {
                            this.state.userRating>0 &&
                            <>
                                &nbsp;- twój głos : {this.state.userRating} 
                                <button 
                                    className="recipe__rating-button--delete"
                                    onClick={this.handleDeleteRating}>
                                    Wycofaj głos
                                </button>
                            </>
                        }
                    </div>
                </div>
        )
    }
}

export default RatingController;