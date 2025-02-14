import React from 'react';
import './InputComponent.scss';

const InputComponent = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-component"
        />
    );
};

export default InputComponent;