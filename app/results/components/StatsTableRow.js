import PropTypes from 'prop-types';
import React from 'react';

class StatsTableRow extends React.PureComponent {

  static propTypes = {
    position: PropTypes.number,
    name: PropTypes.string,
    length: PropTypes.number,
  }

  render() {
    return (
      <tr>
        <td className="ColPosition">
          {this.props.position}
        </td>
        <td className="ColName">
          {this.props.name}
        </td>
        <td className="ColLength">
          <span className="Length">{this.props.length.toString().includes('.') ? Math.round((this.props.length / 1000) * 10) / 10 : `${Math.round(this.props.length / 1000)}.0`}</span> km
        </td>
        <style jsx>{`
          .ColPosition {
            padding: 0 10px 5px 5px;
            text-align: right;
            font-size: 24px;
            line-height: 51px;
            font-family: 'Circular';
          }

          .ColName {
            font-size: 30px;
            line-height: 51px;
          }

          .ColLength {
            text-align: right;
            font-size: 24px;
            line-height: 51px;
            width: 86px;
          }

          .Length {
            font-family: 'Circular';
          }
        `}</style>
      </tr>
    );
  }
}

export default StatsTableRow;
