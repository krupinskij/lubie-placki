import React from 'react';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';

class SearchController extends React.Component {

    state = {
        tag: ""
    }

    componentDidMount = () => {
        const tag = queryString.parse(this.props.history.location.search).s;

        this.setState({ tag })
    }

    componentWillReceiveProps = nextProps => {
        const tag = queryString.parse(nextProps.location.search).s;
        
        this.setState({ tag })
    }

    changeTag = event => {
        const target = event.target;
        const value = target.value;

        this.setState({
            tag: value
        })
    }

    searchClick = event => {
        this.props.history.push("/search?s=" + this.state.tag);
    }

    render() {
        return(
            <div className="component">
                <div className="form__section">
                    <label className="form__label" htmlFor="tags">Podaj słowo kluczowe: </label>
                    <input className="form__input" id="tags" name="tags" value={this.state.tag} type="text" onChange={this.changeTag} />
                </div>

                <div className="form__section">
                    <button className="controller__submit" onClick={this.searchClick}>Szukaj</button>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchController);