import React, {useState, useEffect} from 'react';
import './Profile.scss';
import {Link} from 'react-router-dom'

const Profile = (props) => {
    return (
    <div className='profile h-100 w-100'>
        <div className='header py-3 pl-5'>
            <h6><Link className='text-white' to='/home'>{`<-`}</Link></h6>
            <h6 className='text-white ml-5'>Profile</h6>

        </div>
        <img></img>
        <div>

        </div>
    </div>)

}


export default Profile
