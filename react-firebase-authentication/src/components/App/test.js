import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';

// Test if the <App> component can be rendered without errors.
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});