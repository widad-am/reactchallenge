import React from 'react';
import styled from 'styled-components';

const BaseBadge = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  color: #1a1e26;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.2em 0.8em;
  border-radius: 1em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

export const Badge = styled(BaseBadge)`
  background: linear-gradient(90deg, #1fc8c1 0%, #43e97b 100%);
`;

export const SecondaryBadge = styled(BaseBadge)`
  background: linear-gradient(90deg, #9933ff 0%, #cc66ff 100%);
`; 