export default interface ModalProps {
  children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
  };