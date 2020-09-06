import React, { useRef } from "react";
import PropTypes from "prop-types";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const DeletePlanModal = props => {
  const modalRef = useRef();

  const handleDeleteBtnClick = event => {
    event.target.parentElement.parentElement.classList.replace(
      "animation-slide-down",
      "animation-slide-up"
    );
    setTimeout(() => {
      props.toggleModal(props.plan);
      props.handleDeleteClick(props.plan.planId);
    }, 400);
  };

  const handleCancelBtnClick = event => {
    modalRef.current.classList.replace(
      "animation-slide-down",
      "animation-slide-up"
    );
    setTimeout(() => props.toggleModal(props.plan), 400);
  };

  useOnClickOutside(modalRef, handleCancelBtnClick);

  return (
    <div className="modal">
      <div className="modal-container-centered h-100">
        <div
          className="modal-content modal-content-sm animation-slide-down"
          ref={modalRef}
        >
          <div className="modal-header">
            <h3 className="modal-title text-center">Delete Plan?</h3>
          </div>
          <div className="modal-body text-center">
            <p className="py-1">
              This can't be undone an it will be removed from your profile and
              history.
            </p>
          </div>
          <div className="modal-footer modal-footer-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDeleteBtnClick}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={handleCancelBtnClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeletePlanModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
};

export default DeletePlanModal;
