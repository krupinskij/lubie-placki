import React from 'react';

import favicon from '../images/favicon-icon.png';
import github from '../images/github-icon.png';

class Footer extends React.Component {
	render() {
		return (
			<div className="footer">

				<div className="footer__author">Wykonał <a className="footer__link" href="https://github.com/krupinskij">Jan Krupiński</a></div>

				<div className="footer__credits">

					<div className="footer__credit">
						<img className="credit__icon" src={github} alt="github icon" />
						<div className="credit__link">Znajdź projekt na <a href="https://github.com/krupinskij/lubie-placki">Githubie</a></div>
					</div>

					<div className="footer__credit">
						<img className="credit__icon" src={favicon} alt="favicon icon" />
						<div className="credit__link">Grafiki wykonał <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> z <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
					</div>
				</div>

			</div>
		)
	}
}

export default Footer;