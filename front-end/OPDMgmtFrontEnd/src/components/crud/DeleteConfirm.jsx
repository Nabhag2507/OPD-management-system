import Button from "../common/Button";

const DeleteConfirm = ({ onConfirm, onCancel }) => {
    return (
        <div className="delete-confirm" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <p style={{ animation: 'slideInFromTop 0.3s ease-out' }}>
                Are you sure you want to delete this record? This action cannot be undone.
            </p>
            <div className="confirm-actions" style={{ animation: 'slideInFromBottom 0.3s ease-out 0.1s both' }}>
                <Button label="Delete" onClick={onConfirm} className="btn-danger" />
                <Button label="Cancel" onClick={onCancel} className="btn-secondary" />
            </div>
        </div>
    );
};

export default DeleteConfirm;
