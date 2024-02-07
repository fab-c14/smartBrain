import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            errorMessage: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    onSubmitSignIn = async () => {
        const { email, password, name } = this.state;

        if (!email || !password || !name) {
            this.setState({ errorMessage: "Please fill in all fields." });
            return;
        }

        try {
            const response = await fetch('https://3000-fabc14-smartbrain-h24o6n9vkg3.ws-us108.gitpod.io/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            });

            if (!response.ok) {
                throw new Error('Failed to register.');
            }

            const user = await response.json();

            if (user) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            this.setState({ errorMessage: "Failed to register. Please try again later." });
        }
    };

    render() {
        const { onRouteChange } = this.props;
        const { errorMessage } = this.state;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
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
                        {errorMessage && <p className="red">{errorMessage}</p>}
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Register"
                                onClick={this.onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={() => onRouteChange('sign')}>Sign in</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register;
