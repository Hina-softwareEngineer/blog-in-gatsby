import React, { PropsWithChildren } from 'react';
import './footer.css';
import { data } from '../../../data';


interface Props extends PropsWithChildren<any> { 
    center ?: boolean
}

export function Footer({ center=false}:Props) {
    return (
        <div className='footer'>
            <hr style={{borderColor : "#f6f6f6"}} />
            <p className={`${center ? 'center' : null}`}>
                <span className='color'>BLOGS</span>
                {"  "}© {new Date().getFullYear()}. POWERED BY{"  "}
                <span className='color'>{data.name.split(' ')[0]}</span>.</p>
        </div>
    );
}