import React from 'react';
import './footer.css';

export function Footer({ center}) {
    return (
        <div className='footer'>
            <hr style={{borderColor : "#f6f6f6"}} />
            <p className={`${center ? 'center':null}`}><span className='color'>BLOGS</span> © {new Date().getFullYear()}. POWERED BY <span className='color'>HINA</span>.</p>
        </div>
    );
}