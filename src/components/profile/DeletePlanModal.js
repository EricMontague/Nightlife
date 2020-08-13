import React from "react";
import PropTypes from "prop-types";

const DeletePlanModal = props => {
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
    event.target.parentElement.parentElement.classList.replace(
      "animation-slide-down",
      "animation-slide-up"
    );
    setTimeout(() => props.toggleModal(props.plan), 400);
  };

  return (
    <div className="modal">
      <div className="modal-container-centered">
        <div className="modal-content modal-content-sm animation-slide-down">
          <div className="modal-header">
            <h3 className="modal-title text-center">Delete Plan?</h3>
          </div>
          <div className="modal-body text-center">
            <p className="py-1">
              This can't be undone an it will be removed from your profile and
              history.
            </p>
          </div>
          <div className="modal-footer justify-center">
            <button
              type="button"
              className="btn btn-primary btn-shadow"
              onClick={handleDeleteBtnClick}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-light btn-shadow"
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
