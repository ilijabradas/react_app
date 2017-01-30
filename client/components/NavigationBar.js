import React from 'react';
import { Link } from 'react-router';

export default () => {
	return(
		<nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <Link className="navbar-brand" href="/">REACT APP</Link>
		    </div>

		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul className="nav navbar-nav navbar-right">
		        <li><Link href="/signup">Sign Up</Link></li>
		      </ul>
		    </div>
		  </div>
		</nav>
		);
}