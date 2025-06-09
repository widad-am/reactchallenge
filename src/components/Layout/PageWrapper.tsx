import React from 'react';
import styled from 'styled-components';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  background: #11131a;
  color: #f7f8fa;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
    z-index: 0;
  }

  &::before {
    width: 350px;
    height: 350px;
    background-color: #ff9966;
    top: -50px;
    left: -100px;
  }

  &::after {
    width: 450px;
    height: 450px;
    background-color: #9933ff;
    bottom: -100px;
    right: -150px;
  }

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
    &::before {
      width: 250px;
      height: 250px;
      top: -30px;
      left: -80px;
    }
    &::after {
      width: 350px;
      height: 350px;
      bottom: -80px;
      right: -100px;
    }
  }
`;

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
}; 