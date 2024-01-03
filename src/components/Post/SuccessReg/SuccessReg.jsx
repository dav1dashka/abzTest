import React from "react";

import image from '../../../img/success-image.svg'
import './SuccessReg.scss';

const SuccessReg = () => {
    return (
        <>
            <div className="success">
                <h2 className='success__title'>User successfully registered</h2>
                <div className="success__image">
                    <img src={image} alt="User successfully registered" />
                </div>
            </div>
        </>
    )
};

export default SuccessReg;
