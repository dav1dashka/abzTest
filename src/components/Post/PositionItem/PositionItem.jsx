import React from "react";

import './PositionItem.scss';

const PositionItem = ({ info, onInputChange }) => {
    const handlePositionSelect = (e) => {
        typeof onInputChange === 'function' ? onInputChange(e) : null;
    };
    return (
        <div className="poistion-form__item">
            <input
                type="radio"
                id={info.id}
                name="position"
                value={info.name}
                onChange={(e) => { handlePositionSelect(e.target.value) }}
            />
            <label htmlFor={info.id}>{info.name}</label>
        </div>
    );
};

export default PositionItem;
