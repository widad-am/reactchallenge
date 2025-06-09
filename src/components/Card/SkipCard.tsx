import React from 'react';
import styled, { css } from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { SkipImage } from './SkipImage';
import { Badge, SecondaryBadge } from './Badge';
import { NotAllowed } from './NotAllowed';

const Card = styled.button`
  background: rgba(30, 34, 43, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(48, 53, 63, 0.5);
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
  min-height: 280px;
  outline: none;
  text-align: left;
  transition: all 0.3s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(31, 200, 193, 0.2), rgba(67, 233, 123, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease-out;
    z-index: -1;
  }

  ${(props) =>
    props.selected &&
    css`
      background: rgba(31, 200, 193, 0.1);
      border: 2px solid #1fc8c1;
      box-shadow: 0 12px 40px #1fc8c166;
      transform: translateY(-8px) scale(1.03);
      &::before {
        opacity: 1;
      }
    `}
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      filter: grayscale(1);
      pointer-events: none;
      background: rgba(30, 34, 43, 0.4);
      border-color: rgba(48, 53, 63, 0.3);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `}
  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    transform: translateY(-5px) scale(1.015);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5);
    border-color: #1fc8c1;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
    min-height: 250px;
  }
`;

const CardTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  text-align: left;
  letter-spacing: -0.8px;
  color: #fff;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const CardDetails = styled.div`
  color: #c0c6d4;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: left;
  flex-grow: 1;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
`;

const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #1fc8c1;
  margin-bottom: 0.3rem;
  text-align: left;
  letter-spacing: -1.5px;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.secondary &&
    css`
      color: #cc66ff;
    `}

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const PriceDetails = styled.p`
  color: #b0b6c3;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: left;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
`;

const CardButton = styled.button`
  background: #1fc8c1;
  color: #1a1e26;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.8em 1.5em;
  border-radius: 1.2em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: 100%;
  transition: all 0.2s ease-out;
  box-shadow: 0 4px 15px rgba(31, 200, 193, 0.3);
  position: relative;
  z-index: 1;

  ${(props) =>
    props.secondary &&
    css`
      background: #cc66ff;
      box-shadow: 0 4px 15px rgba(204, 102, 255, 0.3);
    `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 200, 193, 0.4);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(31, 200, 193, 0.2);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

interface SkipCardProps {
  skip: {
    id: string;
    size: number;
    price_before_vat: number;
    vat: number;
    hire_period_days: number;
    allowed_on_road: boolean;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onImageClick: (imageUrl: string) => void;
}

export const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  isSelected,
  onSelect,
  onImageClick,
}) => {
  const isDisabled = !skip.allowed_on_road;
  const isMostPopular = skip.size === 6;
  const isSpecial = skip.size === 8;

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageClick(`/skips/${skip.size}-yarder-skip.jpg`);
  };

  return (
    <Card
      selected={isSelected}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={() => {
        if (!isDisabled) onSelect(isSelected ? '' : skip.id);
      }}
    >
      {isMostPopular && <Badge>Most Popular</Badge>}
      {isSpecial && <SecondaryBadge>2X The Requests</SecondaryBadge>}

      <SkipImage
        size={skip.size}
        selected={isSelected}
        onClick={handleImageClick}
      />

      <CardTitle>{skip.size} Yard{skip.size > 1 ? 's' : ''} Skip</CardTitle>
      <CardDetails>
        Flexible & unlimited access to skip hire with a hyperfast
        turnaround time.
      </CardDetails>
      <Price secondary={isSpecial}>
        £{Math.round(skip.price_before_vat * (1 + skip.vat / 100))}/hire
      </Price>
      <PriceDetails>
        {skip.hire_period_days} day hire period
      </PriceDetails>

      {!skip.allowed_on_road && <NotAllowed />}

      <CardButton secondary={isSpecial}>
        Get Started <FaArrowRight />
      </CardButton>
    </Card>
  );
}; 