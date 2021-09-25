
import React from 'react';
import PropTypes from 'prop-types';

const Gameplay=()=>
{
  return <React.Fragment>
      <h1>Welcome to Gameplay</h1>
    </React.Fragment>;
}

Gameplay.defaultProps = {
  name: 'Tic-Tac-Toe'
};

Gameplay.propTypes = {
  name: PropTypes.string
};

export default Gameplay;
