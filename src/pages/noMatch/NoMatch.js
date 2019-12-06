import React from 'react';
import Kazoo from '../../assets/images/kazoo.gif';
import './_noMatch.scss';

class NoMatch extends React.Component {
	render() {
		return (			
			<div className="t_page t_no-match">
				<div className="g_center">			
					<h2>404</h2>
					<h3>Bing bing bing! Her fins ingenting!</h3>
					<img src={Kazoo} alt="Bare bilde av et ungt Kazoo-talent" />
				</div>
			</div>
		);
	}
}

export default NoMatch;