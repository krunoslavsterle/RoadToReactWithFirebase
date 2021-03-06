import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isSent: false };
        }

        onSendEmailVerification = () => {
            this.props.firebase
                .doSendEmailVerification()
                .then(() => this.setState({ isSent: true }));
        };

        render() {
            return(
                <AuthUserContext.Consumer>
                    {authUser => 
                        needsEmailVerification(authUser) ? (
                            <div>
                                {this.state.isSent ? (
                                    <p>
                                        E-Mail confirmation sent: Check your E-Mails.
                                    </p>
                                ) : (
                                    <p>
                                        Verify your E-mail: Check your email for confirmation.
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={this.onSendEmailVerification}
                                    disabled={this.state.isSent}
                                >
                                    Send confirmation E-Mail
                                </button>
                            </div>
                        ) : (
                            <Component {...this.props} />
                        )
                    }    
                </AuthUserContext.Consumer>
            );          
        }
    }

    return withFirebase(WithEmailVerification);
};

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password');

export default withEmailVerification;