import React from "react";
import { formatDateTime } from "../../services/dates";
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
                {formatDateTime(props.plan.datetime)}
              </p>
            </div>
          </div>
          <div className="modal-body">
            <p className="py-1">{props.plan.description}</p>
          </div>
          <div className="modal-footer">
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
            <button type="button" className="btn btn-secondary btn-shadow">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PlanDetailsModal.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    datetime: PropTypes.instanceOf(Date).isRequired,
    image: PropTypes.string.isRequired,
    placeIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  toggleModal: PropTypes.func.isRequired
};

export default PlanDetailsModal;
