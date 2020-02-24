import React from 'react';
import './Toolbar.scss';


const Toolbar = (props) => (
        <div className='toolbar px-3 w-100'>
                <img id='pic' src={props.img} alt='avatar'></img>
                <p className='mb-0 ml-3'>{props.username}</p>
            <h4 className={props.display}>:</h4>
        </div>
    )


export default Toolbar