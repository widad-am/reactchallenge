import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto 3rem auto;
  display: flex;
  align-items: center;
  background: rgba(40, 44, 52, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 2.5em;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
  padding: 0.5em 1.5em;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    max-width: 100%;
    margin-bottom: 2.5rem;
    padding: 0.4em 1.2em;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #aeb6c4;
  font-size: 1.1em;
  margin-right: 0.8em;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.05rem;
  color: #f7f8fa;
  padding: 0.6em 0;
  outline: none;
  &::placeholder {
    color: #8a94a6;
    font-weight: 400;
    letter-spacing: 0.1px;
  }
`;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <SearchBarWrapper>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder="Search by size or price..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search skips"
      />
    </SearchBarWrapper>
  );
}; 