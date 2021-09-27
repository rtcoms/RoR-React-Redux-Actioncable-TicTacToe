import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../userContext.js'

const Spot= ({spotIndex, game}) => {
  const currentUser = useContext(UserContext);


  return (<React.Fragment>
            <div className="boxes">{spotIndex}</div>
          </React.Fragment>);
}

Spot.defaultProps = {};

Spot.propTypes = {
  spotIndex: PropTypes.number,
  game: PropTypes.object,
};

export default Spot;
