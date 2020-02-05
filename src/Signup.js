import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom'


const HaveAccount = () => {
    return <p className='have-account py-3'>Have an account? <Link to='/login'>Log in</Link></p>
}

const Signup = (props) => {
    let ref1 = React.createRef()
    // function inside function 
    const success = (res) => {
        console.log(res)
    }

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
        e.preventDefault()
        console.log(e.target)
        // show success
        e.target.parentNode.style.opacity=0.1
        ref1.current.classList.remove('d-none')
        setTimeout(()=>{
            ref1.current.classList.add('d-none')
            props.history.push('/login')
        }, 1500)
    }

    return (<div className='signup-page'>
        <div ref={ref1} className='sign-up-success p-3 d-none'>
            <h6 className='text-success'>Sign Up Successful!</h6>
            <hr/>
            <p>Thanks! Your account has been successfully created.Redirecting to login page</p>
            {/* <Link to='/login'></Link> */}
        </div>
        <div className='signup mb-3 px-5 py-4'>
            
            <h1 className='name mb-4'>Guftagu</h1>
            <h5 className='tagline mb-4 text-secondary'>Sign up to chat with your friends</h5>
            <GoogleLogin className='google-login mb-3 form-control bg-primary text-white border-0'
                    clientId='904788089838-dm7oosdn71e7ei5qrv6jrt0d99bl9ghp.apps.googleusercontent.com'
                    buttonText="Log in with Google"
                    onSuccess={success}
                    onFailure={failure}
            />

            <hr/>
            <form className='form-group my-3' onChange={onChange} onSubmit={onSubmit}>
                <input name='email' value={user.email} type='email' className="form-control mb-2" placeholder='Email' required/>
                <input name='username' value={user.username} type='text' className="form-control mb-2" placeholder='Username' required/>
                <input name='password' value={user.password} type='password' className="form-control mb-2" placeholder='Password' required/>
                <button className="btn btn-primary w-100 mb-3 sign-up-btn">Sign up</button>
                <p><Link to='/policy' className='policy text-secondary'>By signing up, you agree to our<strong> Terms , Data Policy and Cookies Policy .</strong></Link></p>
            </form>
        </div>
        <div>
            <HaveAccount/>
        </div>


        


    </div>)
}


export default Signup