import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  margin: 4rem auto;
  border: 4px solid #232733;
  border-top: 4px solid #1fc8c1;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Loader: React.FC = () => {
  return <LoaderWrapper aria-label="Loading skips..." />;
}; 