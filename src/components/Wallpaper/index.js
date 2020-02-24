import React from 'react';
import './Wallpaper.scss'

const Wallpaper = (props) => {
    return (
    <div className='wallpaper'>
        <img id='phone' alt='phone' src='https://previews.123rf.com/images/cosmaa/cosmaa1805/cosmaa180500015/100729800-cartoon-illustration-of-phone-notification-alarm-and-police-flasher-on-phone-display-hand-holding-sm.jpg'></img>
        <h1 className='text-secondary mt-3'>Keep your phone connected</h1>
        <p className='text-secondary'>Talk to your friends, here, everywhere.</p>
    </div>)
}

export default Wallpaper;
