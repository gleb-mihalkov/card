import React from 'react';
import './Github.scss';

/**
 * Component of link to Github.
 */
export default props => {
  let href = 'https://github.com/gleb-mihalkov/card';

  return (
    <div className="github">
      <a href={href} className="github_link" target="_blank" rel="nofollow">
        Source code on Github
      </a>
    </div>
  );
};
