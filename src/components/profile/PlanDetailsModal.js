import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { convertDatetimeToString } from "../../services/dateTimeHelpers";
import PropTypes from "prop-types";

const PlanDetailsModal = props => {
  const modalRef = useRef();

  const closeModal = event => {
    modalRef.current.classList.replace(
      "animation-slide-down",
      "animation-slide-up"
    );
    setTimeout(() => props.toggleModal(props.plan), 400);
  };

  useOnClickOutside(modalRef, closeModal);
  return (
    <div className="modal">
      <div className="modal-container-centered">
        <div
          className="modal-content modal-content-md animation-slide-down"
          ref={modalRef}
        >
          <div className="modal-header">
            <div className="modal-image">
              <img src={props.plan.image} alt={props.plan.title} />
            </div>
            <h3 className="modal-title">{props.plan.title}</h3>
            <div className="flex-row align-items space-between">
              <p className="text-medium font-size-sm">
                {convertDatetimeToString(
                  new Date(props.plan.date + " " + props.plan.time)
                )}
              </p>
            </div>
          </div>
          <div className="modal-body">
            <p className="py-1">{props.plan.description}</p>
            <Link
              to={`/plans/${props.plan.planId}/view`}
              className="link flex-start"
            >
              View Plan Details
            </Link>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-left">
              <button type="button" className="btn btn-secondary">
                Edit
              </button>
              <button
                type="button"
                className="btn btn-light"
                // Need to look into react-transition-group instead of this hack
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlanDetailsModal.propTypes = {
  plan: PropTypes.shape({
    planId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    placeIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  toggleModal: PropTypes.func.isRequired
};

export default PlanDetailsModal;
