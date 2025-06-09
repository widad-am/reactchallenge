import React from 'react';
import styled, { css } from 'styled-components';

const SkipImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1e26;
  border-radius: 50%;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.4), 0 2px 5px rgba(0,0,0,0.2);
  margin-bottom: 1rem;
  overflow: hidden;
  border: 1px solid rgba(48, 53, 63, 0.5);
  transition: all 0.2s ease-out;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      border-color: #1fc8c1;
      box-shadow: inset 0 0 10px rgba(31,200,193,0.6), 0 3px 8px rgba(31,200,193,0.4);
    `}

  &:hover {
    transform: scale(1.05);
    box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3);
  }
`;

const SkipImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  display: block;
  filter: brightness(1.1) contrast(1.1);
  transition: all 0.2s ease-out;
`;

interface SkipImageProps {
  size: number;
  selected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const SkipImage: React.FC<SkipImageProps> = ({ size, selected, onClick }) => {
  return (
    <SkipImageWrapper selected={selected} onClick={onClick}>
      <SkipImage
        src={`/skips/${size}-yarder-skip.jpg`}
        alt={`Photo of a ${size} Yard${size > 1 ? 's' : ''} skip`}
        onError={(e) => {
          e.currentTarget.src = "/skips/default.png";
        }}
      />
    </SkipImageWrapper>
  );
}; 