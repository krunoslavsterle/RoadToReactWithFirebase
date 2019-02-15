import React from 'react';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
    
            this.state = {
                authUser: JSON.parse(localStorage.getItem('authUser'))
            };
        }
    
        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.setState({ authUser });
                },
                () => {
                    this.localStorage.removeItem('authUser');
                    this.setState({ authUser: null });
                }
            );
        }
    
        componentWillUnmount() {
            // remove the listener if the component unmounts to avoid memory leaks.
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;