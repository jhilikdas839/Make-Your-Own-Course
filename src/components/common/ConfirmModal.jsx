import Modal from "./Modal";
import Button from "./Button";

function ConfirmModal({ open, onClose, onConfirm, title, message, confirmText = "Confirm", danger = false }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            variant={danger ? "danger" : "dark"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm leading-6 text-gray-600">{message}</p>
    </Modal>
  );
}

export default ConfirmModal;
