import React from 'react';
import styled from 'styled-components';

const StyledContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 600px) {
    padding: 0 0.8rem;
  }
`;

interface ContentWrapperProps {
  children: React.ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <StyledContentWrapper>{children}</StyledContentWrapper>;
}; 