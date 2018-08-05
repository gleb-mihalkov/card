import React from 'react';
import './Github.scss';

/**
 * Component of link to Github.
 */
export default class Github extends React.Component {

  /**
   * Renders component.
   * @return {*} React element.
   */
  render() {
    let href = 'https://github.com/gleb-mihalkov/card';

    return (
      <div className="github">
        <a href={href} className="github_link" target="_blank" rel="nofollow">
          Source code on Github
        </a>
      </div>
    );
  }
}
