import React from 'react';
import {Link} from 'react-router-dom';
import './HaveAccount.scss'

const HaveAccount = (props) => {
    return (
    <p className='have-account py-3'>
        {props.text}
        <Link to={props.redirect}>{props.link}</Link>
    </p>
    )
}

export default HaveAccount