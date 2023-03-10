import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import ModalProps from '../../interfaces/ModalProps';

// children: React.ReactNode;
// isOpen: boolean;
// onClose: () => void;


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ReactModal isOpen={isOpen} onRequestClose={onClose}>
      {children}
    </ReactModal>,
    modalRoot
  );
};

export default Modal;