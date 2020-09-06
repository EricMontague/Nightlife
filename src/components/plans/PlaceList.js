import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import Place from "./Place";
import constants from "../../utils/constants";

const PlaceList = props => {
  const isDragDisabled = props.discoverMode === constants.DISCOVER_MODE.VIEW;

  let extraClassNames = { placeCardBody: "" };
  if (isDragDisabled) {
    extraClassNames = { placeCardBody: " cursor-pointer" };
  }

  return (
    <div className="card-body mb-3">
      {props.places.map((place, index) => {
        const placeCardClassName = { placeCard: "" };
        if (props.mousedOverPlaceId === place.placeId) {
          placeCardClassName.placeCard = " selected";
        }
        return (
          <Draggable
            key={place.placeId}
            draggableId={place.placeId}
            index={index}
            isDragDisabled={isDragDisabled}
          >
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Place
                  position={place.sortKey + 1}
                  place={place}
                  handleDeleteClick={props.handleDeleteClick}
                  discoverMode={props.discoverMode}
                  toggleModal={props.toggleModal}
                  extraClassNames={{
                    ...extraClassNames,
                    ...placeCardClassName
                  }}
                />
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

PlaceList.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      placeId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      formattedAddress: PropTypes.string.isRequired,
      location: PropTypes.objectOf(PropTypes.func.isRequired),
      openingHours: PropTypes.shape({
        isOpen: PropTypes.func.isRequired,
        periods: PropTypes.arrayOf(
          PropTypes.shape({
            close: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            }),
            open: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            })
          })
        )
      }),
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          getUrl: PropTypes.func.isRequired,
          height: PropTypes.number.isRequired,
          html_attributions: PropTypes.arrayOf(PropTypes.string.isRequired),
          width: PropTypes.number.isRequired
        })
      ),
      priceLevel: PropTypes.number,
      rating: PropTypes.number,
      website: PropTypes.string
    })
  ),
  toggleModal: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  discoverMode: PropTypes.string.isRequired,
  mousedOverPlaceId: PropTypes.string.isRequired
};
export default React.memo(PlaceList);
