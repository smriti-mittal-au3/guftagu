import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';
import HaveAccount from '../HaveAccount'
import './Signup.scss';
const fetch = require('../../api')


const GoogleSignUp = (props) => {
    return (<GoogleLogin className='google-login mb-3 form-control bg-primary text-white border-0'
                clientId='904788089838-dm7oosdn71e7ei5qrv6jrt0d99bl9ghp.apps.googleusercontent.com'
                buttonText="Log in with Google"
                onSuccess={props.onSubmit}
                onFailure={props.failure}
            />)
}

const Alert = (props) => {
    return (
        <div ref={props.refx} className={`sign-up-success p-3 d-none ${props.class}`}>
            <h6>{props.header} {props.text}</h6>
        </div>)

}

const Signup = (props) => {
    let ref1 = React.createRef()
    let ref2 = React.createRef()
    // function inside function 


    const failure = (res) => {
        console.log(res)
    }

    const [user, setUser] = useState({email:'', username:'', password:''})

    const onChange = (e) => {
        if(e.target.nodeName==='INPUT'){
            setUser(Object.assign({}, user, {[e.target.name]:e.target.value}))
        }
    }

    const onSubmit = (e) => {
        let data = {}
        let email = ''
        let username = ''
        let password = ''
        let token = false
        if(e.target && e.target.nodeName==='FORM'){
            e.preventDefault()
            // console.log(e.target)
            email = e.target[0].value
            username = e.target[1].value
            password = e.target[2].value
            token = false
        }
        else{
            email = e.profileObj.email
            username = e.profileObj.name 
            password = e.accessToken 
            token = true   
        }

        data = {email, username, password, token}
        console.log(data)
        console.log(ref1, ref2, "ref1, ref2")
        ref1.current.nextSibling.style.opacity=0.1
        // api
        fetch.accounts(ref1, ref2, props, data)
            
    }

    return (
    <div className='sign-up'>
    <img className='whatsapp' alt='whatsapp' src='https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c543.png'></img>
    <div className='sign-up-box'>
        <Alert refx={ref2} class='alert alert-danger' header='Oops!' text='Sign up Unsuccessful! Please try again' />
        <Alert refx={ref1} class='alert alert-success' header='Sign Up Successful!' text='Thanks! Your account has been successfully created' />
        
        <div className='sign-up-form mb-3 px-5 py-4'>
            <h1 className='name mb-3'>Guftagu</h1>
            <hr/>
            <h5 className='tagline mb-3 text-secondary'>Sign up to chat with your friends</h5>
            <GoogleSignUp onSubmit={onSubmit} failure={failure}/>
            <h3 className='text-secondary'>OR</h3>
            <hr/>
            <form className='form-group' onChange={onChange} onSubmit={onSubmit}>
                <input name='email' value={user.email} type='email' className="form-control mb-2 sign-up-input" placeholder='Email' required/>
                <input name='username' value={user.username} type='text' className="form-control mb-2 sign-up-input" placeholder='Username' required/>
                <input name='password' value={user.password} type='password' className="form-control mb-2 sign-up-input" placeholder='Password' required/>
                <button className="btn btn-primary sign-up-btn">Sign up</button>
                <p className='policy'>
                    <Link to='/policy' className='text-secondary'>By signing up, you agree to our
                        <strong> Terms , Data Policy and Cookies Policy .</strong>
                    </Link>
                </p>
            </form>
        </div>
        <HaveAccount link='Log In' text="Have an account?" redirect='/login' />
    </div>
    </div>)
}


export default Signup
