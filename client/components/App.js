import React from 'react';
import NavigationBar from './NavigationBar';

class App extends React.Component { // use class components for top component for hot relaod to work
    render() {
        return (
        	<div className="container">
        	<NavigationBar />
        	{this.props.children}
        	</div>
        );
    }
}
export default App;
