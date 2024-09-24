import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
    type: "text" | "number";
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ type, value, placeholder, onChange }) => {
    return (
        <div className="input-container">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchInput;