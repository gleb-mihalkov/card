import React from 'react';
import classnames from 'classnames';
import './Card.scss';

/**
 * Card component.
 */
export default props => {
  let {isLoading, centred, fullheight, children} = props;

  let classes = classnames({
    'card': true,
    'card-loading': isLoading,
    'card-loaded': !isLoading,
    'card-fullheight': fullheight,
    'card-centred': centred
  });

  return (
    <div className={classes}>
      <div className="card_main">{children}</div>
      <div className="card_aside">
        <svg x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30">
          <rect x="0" y="13" width="4" height="5" fill="#333">
            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="10" y="13" width="4" height="5" fill="#333">
            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="20" y="13" width="4" height="5" fill="#333">
            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
  );
};
