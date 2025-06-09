import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  color: #e67e22;
  text-align: center;
  margin: 2rem 0;
  font-size: 1.05rem;
`;

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorWrapper>{message}</ErrorWrapper>;
}; 