import React from 'react'

class PageController extends React.Component {

    state = {
        pages: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3004/recipes/pages")
        .then(resp => resp.json())
			.then(resp => {
				this.setState({
					pages: Array(resp).fill(0)
				})
			})
    }

    render() {
        const pageButtons = this.state.pages.map((_,i) => { 
            return( 
                <button key={i} 
                    className={i==this.props.currentPage-1 ? "page-controller__button page-controller__button--current" : "page-controller__button"}
                    onClick={ event => { this.props.choosePage(event, i+1)} }>
                    {i+1}
                </button> 
            ) 
        })

        return(
            <div className="component">
                <div className="page-controller">
                    {pageButtons}
                </div>
            </div>
        )
    }
}

export default PageController;