import React from 'react';
import './Loading.css';

interface LoadingProps {
    isLoading: boolean;
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, text }) => {
    if (!isLoading) return
    return (
        <div className='loading-container'>
            <div className="spinner"></div>
            {text && <p className='loading'>{text}</p>}
        </div>
    );
};

export default Loading;