import PropTypes from 'prop-types';
import React from 'react';

// Components
import VersusIconSmall from './VersusIconSmall';
import VersusIcon from './VersusIcon';
import { prefixURL } from '../../../utils/url';

// Images
const IconTriangle = prefixURL('/static/icons/Icon_Triangle.svg');
const IconCar = prefixURL('/static/icons/Icon_SpaceAllocation_Car.svg');
const IconRail = prefixURL('/static/icons/Icon_SpaceAllocation_Rail.svg');
const IconBike = prefixURL('/static/icons/Icon_SpaceAllocation_Bike.svg');

class VersusTriangle extends React.PureComponent {

  static propTypes = {
    currentCity: PropTypes.object,
    triangleData: PropTypes.array
  }

  render() {
    return (
      <div className="Container">
        <div className="ContainerRow">
          <img className="Icon" alt="IconCar" src={IconCar} />
        </div>
        <div className="ContainerRow">
          <div className="TriangleContainer">
            <img className="Triangle" alt="IconTriangle" src={IconTriangle} />
            <VersusIcon
              currentCity={this.props.currentCity}
              triangleData={this.props.triangleData} />
          </div>
        </div>
        <div className="ContainerRow bottom">
          <img className="Icon" alt="IconRail" src={IconRail} />
          <img className="Icon" alt="IconBike" src={IconBike} />
        </div>
        <div className="About">
          <h4 className="AboutTitle">
            About
          </h4>
          <p className="AboutText">
            The mobility triangle shows how people <i>actually</i> move in each city. It also compares this to how much city space is allocated to the different modes of transport. <br /> <a href="https://move-lab.space/blog/about-what-the-street#the-arrogance-of-space-how-to-understand-the-mobility-triangle" target="_blank">More Information</a>
          </p>
        </div>
        <div className="Description">
          <VersusIconSmall />
          <div>
            <p className="DescriptionText">
              How space is allocated
            </p>
            <p className="DescriptionText">
              How people move
            </p>
          </div>
        </div>
        <style jsx>{`
          .Container {
            position: relative;
            padding-bottom: 50px;
          }

          .ContainerRow {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .ContainerRow.bottom {
            justify-content: space-between;
            padding: 0 40px;
            margin: -40px 0 0 0;
          }

          .TriangleContainer {
            position: relative;
          }

          .Description {
            position: absolute;
            display: flex;
            right: -80px;
            top: 440px;
          }

          .DescriptionText {
            display: flex;
            flex-direction: column;
            font-size: 21px;
            line-height: 27px;
            margin: 0;
            padding-top: 18px;
            padding-left: 10px;
          }

          .About {
            position: absolute;
            right: -80px;
            top: 210px;
            width: 320px;
          }

          .AboutTitle {
            font-size: 40px;
            margin: 0 0 20px 0;
          }

          .AboutText {
            font-size: 21px;
            margin: 0;
          }

          .AboutText a {
            margin: 0;
            padding-left: 3px;
          }
        `}</style>
      </div>
    );
  }
}

export default VersusTriangle;
