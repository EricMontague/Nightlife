import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Rating = props => {
  const renderStars = () => {
    const starList = [];
    if (props.stars) {
      for (let star = 0; star < parseInt(props.stars); star++) {
        starList.push(<FontAwesomeIcon key={star} icon={["fa", "star"]} />);
      }
      // handle ratings that are floats
      if (props.stars % 1 !== 0) {
        starList.push(
          <FontAwesomeIcon
            key={starList.length}
            icon={["fa", "star-half-alt"]}
          />
        );
      }
    }

    return starList;
  };

  return <div className="rating">{renderStars()}</div>;
};

Rating.propTypes = {
  stars: PropTypes.number.isRequired
};

export default React.memo(Rating);
