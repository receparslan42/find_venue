// Popup modal component for displaying messages
const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>
          {" "}
          Close{" "}
        </button>
      </div>
    </div>
  );
};

export default Modal;
