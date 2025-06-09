import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: #1a1e26;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s ease-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalImage src={imageUrl} alt="Full size skip image" />
      </ModalContent>
    </ModalOverlay>
  );
}; 