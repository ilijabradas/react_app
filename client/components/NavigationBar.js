import React from 'react';
import { Link, IndexLink } from 'react-router';

export default () => {
	return(
		<nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <IndexLink className="navbar-brand" href="/">REACT APP</IndexLink>
		    </div>

		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul className="nav navbar-nav navbar-right">
		        <li><Link href="/signup">Sign Up</Link></li>
						<li><Link href="/signin">Sign In</Link></li>
		      </ul>
		    </div>
		  </div>
		</nav>
		);
};
