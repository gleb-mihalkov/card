import React from 'react';
import './Card.scss';

/**
 * Card component.
 */
export default class Card extends React.Component {

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let {isLoading, centred, fullheight} = this.props;

    let classList = ['card', isLoading ? 'card-loading' : 'card-loaded'];
    fullheight && classList.push('card-fullheight');
    centred && classList.push('card-centred');
    classList = classList.join(' ');

    return (
      <div className={classList}>
        <div className="card_main">
          {this.props.children}
        </div>
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
  }
}
