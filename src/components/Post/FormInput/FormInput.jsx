import React from "react";

import { useState } from 'react';
import './FormInput.scss';

const FormInput = ({ placeholder, type, id, name, labelText, labelAboveText, pattern, onInputChange }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isItemValid, setIsItemValid] = useState(true);

    const handleItemClick = () => {
        setIsClicked(true);
    };

    const onValidateInput = (value, pattern) => {
        if (!value.match(pattern)) {
            setIsItemValid(false);
        } else {
            setIsItemValid(true);
        }
    };

    const formClass = `form__item ${isClicked ? 'active' : ''} ${isItemValid ? '' : 'not-valid'}`;

    return (
        <div className={formClass} onClick={handleItemClick}>
            <input
                placeholder={placeholder}
                className="form__input"
                type={type}
                id={id}
                name={name}
                required
                pattern={pattern}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    if (typeof onInputChange === 'function') {
                        onInputChange(e.target.value);
                        onValidateInput(e.target.value, pattern)
                    };
                }}
            />
            <div className="form__labelAbove">
                {labelAboveText}
            </div>
            {isClicked
                ? <label className="form__label" htmlFor={id}>
                    {labelText}
                </label>
                : null}
        </div>
    );
};

export default FormInput;
