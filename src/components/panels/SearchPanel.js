import React from 'react'

import { withRouter } from 'react-router-dom';

import FA from 'react-fontawesome'

class SearchPanel extends React.Component {

    state = {
        search: ""
    }

    handleSearchChange = event => {
        const target = event.target;
        const value = target.value;

        this.setState({
            search: value
        })
    }

    searchClick = () => {
        this.props.history.push("/search?s=" + this.state.search);
    }

    render() {
        return(
            <div className="search-panel">
                <button className="search-panel__button" onClick={this.searchClick}>
                    <FA className="search-panel__icon" name="search" />
                </button>
                <input className="search-panel__input" type="text" onChange={this.handleSearchChange}/>
            </div>
        )
    }
}

export default withRouter(SearchPanel);