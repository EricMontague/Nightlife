import React from "react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../services/dateTimeHelpers";
import PropTypes from "prop-types";

const PlanDetailsModal = props => {
  return (
    <div className="modal">
      <div className="modal-container-centered">
        <div className="modal-content modal-content-md animation-slide-down">
          <div className="modal-header">
            <div className="modal-image">
              <img src={props.plan.image} alt={props.plan.title} />
            </div>
            <h3 className="modal-title">{props.plan.title}</h3>
            <div className="flex-row align-items space-between">
              <p className="text-medium font-size-sm">
                {formatDateTime(
                  new Date(props.plan.date + " " + props.plan.time)
                )}
              </p>
            </div>
          </div>
          <div className="modal-body">
            <p className="py-1">{props.plan.description}</p>
            <Link to={`/plans/${props.plan.planId}/view`} className="link">
              View Plan Details
            </Link>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-left">
              <button type="button" className="btn btn-secondary btn-shadow">
                Edit
              </button>
              <button
                type="button"
                className="btn btn-light btn-shadow"
                // Need to look into react-transition-group instead of this hack
                onClick={event => {
                  event.target.parentElement.parentElement.classList.replace(
                    "animation-slide-down",
                    "animation-slide-up"
                  );
                  setTimeout(() => props.toggleModal(props.plan), 400);
                }}
              >
                Close
              </button>
            </div>
            {/* <div className="modal-footer-right">
              <Link to={`/plans/${props.plan.planId}/view`} className="link">
                View Plan Details
              </Link>
            </div> */}
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
