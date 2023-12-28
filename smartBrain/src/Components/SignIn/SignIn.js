import React from 'react';

class SignIn extends React.Component{

    constructor(){
        super(props);
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }
    onEmailChange = (event) =>{
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({signInPassword:event.target.value})
    }

    onSubmitSignIn = ()=>{
        console.log(this.state)
    }
    render(){
        const {onRouteChange} = this.props;
        return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    
                    </fieldset>
                    <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in" 
                    onClick={()=>onRouteChange('home')}
                    
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <p className="f6 link dim black db pointer" onClick={()=>onRouteChange('register')}>Register</p>
                    </div>
                </form>
            </main>
        </article>
        )
    }
}
export default SignIn