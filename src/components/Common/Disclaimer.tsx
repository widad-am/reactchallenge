import React from 'react';
import styled from 'styled-components';

const DisclaimerWrapper = styled.p`
  color: #7a7f8a;
  font-size: 0.85rem;
  text-align: center;
  margin-top: 3rem;
  padding: 0 1rem;
  line-height: 1.5;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin-top: 2rem;
    padding: 0 0.8rem;
  }
`;

export const Disclaimer: React.FC = () => {
  return (
    <DisclaimerWrapper>
      Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
    </DisclaimerWrapper>
  );
}; 