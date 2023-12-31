import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    };

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    };

    onSubmitSignIn = () => {
        console.log(this.state);

        fetch('https://3000-fabc14-smartbrain-869wclgw977.ws-us107.gitpod.io/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data === 'success');
                if (data === 'success') {
                    console.log('matched');
                    this.props.onRouteChange('home');
                } else {
                    console.log('Sign-in failed');
                }
            })
            .catch(error => console.error('Error during sign-in:', error));
    };

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Sign in"
                                onClick={this.onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={() => this.props.onRouteChange('register')}>Register</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default SignIn;
