import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flashMessages/FlashMessagesList';

class App extends React.Component {
    render() {
        return (
                <div className="container">
                    <NavigationBar/>
                    <FlashMessagesList/>
                    {this.props.children}
                </div>
        );
    }
}
export default App;
// use class components for top component for hot relaod to work
