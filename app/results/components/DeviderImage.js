import PropTypes from 'prop-types';
import React from 'react';

class DeviderImage extends React.PureComponent {

  static propTypes = {
    alt: PropTypes.string,
    background: PropTypes.string,
    foreground: PropTypes.string,
  }

  render = () => (
    <div className="Container" style={{ backgroundImage: `url(${this.props.background})` }}>
      <img alt={this.props.alt} src={this.props.foreground} />
      <style jsx>{`
        .Container {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          height: 480px;
          display: flex;
          justify-content: center;
          align-items: center
        }
      `}</style>
    </div>
  )
}

export default DeviderImage;
