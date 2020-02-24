import React, {useState, useEffect} from 'react';
import './Home.scss';
import Profile from '../Profile';
import Search from '../Search';
import {connect} from 'react-redux';
import RightPanel from '../RightPanel';
import {Route} from 'react-router-dom';
const fetch = require('../../api')

const Home = (props) => {

    const [className, setClassName] = useState('')
    const [login] = useState(sessionStorage.getItem('login')? JSON.parse(sessionStorage.getItem('login')):null)


    const addClass = (addClass) => {
        setClassName(addClass)

    }

    useEffect(()=>{
        console.log("inside useeffect of home")
        fetch.contacts(props.dispatch, login.username)

    })
    
    return (<div className='home'>
        <div className={`sidebar px-0 + ${className}`}>
            <Route exact path='/home' component={Search}></Route>
            <Route exact path='/home/profile' component={Profile}></Route>     
        </div> 
        <RightPanel addClass={addClass}/>           
    </div>)

}


export default connect()(Home)
