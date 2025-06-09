import React from 'react';
import styled from 'styled-components';

const NotAllowedWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3em;
  background: rgba(230, 126, 34, 0.2);
  color: #e67e22;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
  padding: 0.15em 0.6em;
  border-radius: 0.4em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  width: fit-content;
  position: relative;
  z-index: 1;
`;

export const NotAllowed: React.FC = () => {
  return (
    <NotAllowedWrapper>
      <span aria-hidden="true" style={{ fontSize: '1.1em', marginRight: '0.3em' }}>⚠️</span>
      Not Allowed On The Road
    </NotAllowedWrapper>
  );
}; 