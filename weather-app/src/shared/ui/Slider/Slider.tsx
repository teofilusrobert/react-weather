import React from 'react';
import './Slider.css';

interface SliderProps {
    label?: string;
    min: number;
    max: number;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({ label, min, max, value, onChange }) => {
    return (
        <div className='slider-label-container'>
            {label && <p className='label'>{label}</p>}
            <div className="slider-container">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="slider"
                />
                <div className="slider-values">
                    <span>{min}</span>
                    <span>{value}</span>
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
};

export default Slider;