import React from "react";

import './Skeleton.scss';
import skeleton from '../../../img/skeleton.svg'

const Skeleton = ({ id }) => {
    return (
        <div key={id} className="skeleton">
            <img src={skeleton} alt="" />
        </div>
    )
};

export default Skeleton;

