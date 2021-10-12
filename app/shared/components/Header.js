import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Router from 'next/router';
import Link from 'next/link';

// Components
import VehicleIcon from './VehicleIcon';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';
import { prefixURL } from '../../../utils/url';
import { showSearch } from '../../statemanagement/ExploreStateManagement';

const searchIcon = prefixURL('/static/icons/Icon_Search.svg');
const homeIcon = prefixURL('/static/icons/Icon_Home.svg');

class Header extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    activeVehicle: PropTypes.string,
    cityName: PropTypes.string,
    parkingSpace: PropTypes.object,
    laneRailParking: PropTypes.object,
    lane: PropTypes.object,
    cityLandmark: PropTypes.object,
    onSearchButtonClick: PropTypes.func,
    mode: PropTypes.oneOf(['explore', 'normal'])
  };

  static defaultProps = {
    mode: 'normal'
  };

  constructor() {
    super();

    this.getHumanArea = this.getHumanArea.bind(this);

    this.state = {
      FH: new Intl.NumberFormat('en-US'),
      FH1Digit: new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      })
    };
  }

  getTypeOfMobilityLabel(mobilityType) {
    if (mobilityType === 'car') {
      return 'Street';
    } else if (mobilityType === 'bike') {
      return 'Biketrack';
    } else if (mobilityType === 'rail') {
      return 'Railtrack';
    }
  }

  getLaneLabel(laneName, neighborhoodName, mobilityType, cityName) {
    let laneLabel;

    if (laneName) {
      laneLabel = laneName;
    } else if (neighborhoodName) {
      laneLabel = `${this.getTypeOfMobilityLabel(mobilityType)} in ${neighborhoodName}`;
    } else {
      laneLabel = `${this.getTypeOfMobilityLabel(mobilityType)} in ${cityName}`;
    }
    return laneLabel;
  }

  getLaneSubLabel(laneLenght, laneArea) {
    return `${this.state.FH.format(Math.round(laneLenght))}m = ${this.state.FH.format(
      Math.round(laneArea)
    )}m²`;
  }

  getParkingLabel(neighborhood, cityName) {
    if (neighborhood) {
      return `Parking space in ${neighborhood}`;
    } else {
      return `Parking space in ${cityName}`;
    }
  }

  getParkingSubLabel(mobilityType, parkingArea) {
    if (mobilityType === 'car') {
      return `${this.state.FH.format(Math.round(parkingArea))}m² = ${this.state.FH.format(
        Math.round(parkingArea / 12)
      )} cars`;
    } else if (mobilityType === 'bike') {
      return `${this.state.FH.format(Math.round(parkingArea))}m² = ${this.state.FH.format(
        Math.round(parkingArea / 1.6)
      )} bikes`;
    } else if (mobilityType === 'rail') {
      return `${this.state.FH.format(Math.round(parkingArea))}m² = ${this.state.FH.format(
        Math.round(parkingArea / 30)
      )} wagons`;
    }
  }

  renderParkingInfo() {
    if (this.props.parkingSpace.id > 0) {
      return (
        <div className="InfoLabel">
          <h3>{this.getParkingLabel(this.props.parkingSpace.neighborhood, this.props.cityName)}</h3>
          <p>{this.getParkingSubLabel(this.props.activeVehicle, this.props.parkingSpace.area)}</p>
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No parking selected</h3>
      </div>
    );
  }

  renderLaneRailParkingInfo() {
    if (this.props.laneRailParking.id > 0) {
      return (
        <div className="InfoLabel">
          <h3>
            {this.getParkingLabel(this.props.laneRailParking.neighborhood, this.props.cityName)}
          </h3>
          <p>
            {this.getParkingSubLabel(this.props.activeVehicle, this.props.laneRailParking.area)}
          </p>
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No rail parking selected</h3>
      </div>
    );
  }

  renderLaneInfo() {
    if (this.props.lane.id > 0) {
      return (
        <div className="InfoLabel">
          <h3>
            {this.getLaneLabel(
              this.props.lane.name,
              this.props.lane.neighborhood,
              this.props.activeVehicle,
              this.props.cityName
            )}
          </h3>
          <p>{this.getLaneSubLabel(this.props.lane.length, this.props.lane.area)}</p>
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No lane selected</h3>
      </div>
    );
  }

  getHumanArea(area) {
    const cityLandmarkArea = this.props.cityLandmark.area;
    if (area < 225) {
      return `${this.state.FH1Digit.format(area)} m²`;
    } else if (area < 225 * 1000) {
      // change at 1000 playgrounds
      const playgroundArea = 225;
      const nbPlayground = Math.round((area / playgroundArea) * 10) / 10;
      const playgroundLabel = nbPlayground > 1 ? 'Playgrounds' : 'Playground';
      return `${this.state.FH1Digit.format(nbPlayground)} ${playgroundLabel}`;
    } else if (area < cityLandmarkArea) {
      const soccerFieldArea = 7140;
      const nbSoccerField = Math.round((area / soccerFieldArea) * 10) / 10;
      const soccerFieldLabel = nbSoccerField > 1 ? 'Soccer Fields' : 'Soccer Field';
      return `${this.state.FH1Digit.format(nbSoccerField)} ${soccerFieldLabel}`;
    } else {
      const nbCityLandmark = Math.round((area / cityLandmarkArea) * 10) / 10;
      const cityLandmarkLabel = this.props.cityLandmark.name;
      return `${this.state.FH1Digit.format(nbCityLandmark)} ${cityLandmarkLabel}`;
    }
  }

  goToHomePage() {
    Router.push(
      {
        pathname: '/',
        query: this.props.ownGuess.toJS()
      },
      {
        pathname: prefixURL(`/${this.props.citySlug}`),
        query: this.props.ownGuess.toJS()
      },
      { shallow: true }
    );
  }

  showSearch() {
    this.props.dispatch(showSearch());
  }

  render() {
    return (
      <header
        className={this.props.mode === 'normal' ? 'NavigationBar' : 'ScrollPageNavigationBar'}
      >
        {this.props.mode === 'normal' && (
          <div className="Content">
            <Link
              prefetch
              href="/"
              as={{
                pathname: prefixURL(`/${this.props.citySlug}`),
                query: this.props.ownGuess.toJS()
              }}
            >
              <a className="Title Link">{this.props.title}</a>
            </Link>
            <Link prefetch href="/about" as={prefixURL('/about')}>
              <a className="AboutLink Link">About</a>
            </Link>
          </div>
        )}
        {this.props.mode === 'explore' && (
          <div className="Content">
            <div className="Container ContainerLeft">
              <div className="NavButtons">
                <div className="HomeButton">
                  <button onClick={() => this.goToHomePage()}>
                    <img alt="" className="HomeIcon" src={homeIcon} />
                    <span>Home</span>
                  </button>
                </div>
                {this.props.activeVehicle === 'car' && (
                  <div className="SearchButton">
                    <button onClick={() => this.showSearch()}>
                      <img alt="" src={searchIcon} />
                      <span>Search Streets</span>
                    </button>
                  </div>
                )}
              </div>
              {this.props.activeVehicle === 'rail' && this.renderLaneRailParkingInfo()}
              {this.props.activeVehicle !== 'rail' && this.renderParkingInfo()}
            </div>
            <div className="Container ContainerCenter">
              <div className="VehicleAndAreaM2">
                <VehicleIcon vehicle={this.props.activeVehicle} width={70} height={70} />
                <div className="AreaM2">
                  {this.state.FH.format(this.props.lane.cumulativeArea)} m²
                </div>
              </div>
              <div className="AreaHuman">{this.getHumanArea(this.props.lane.cumulativeArea)}</div>
            </div>
            <div className="Container ContainerRight">
              {this.renderLaneInfo()}
            </div>
          </div>
        )}
        <style jsx>{`
          .NavigationBar {
            z-index: ${METRICS.MetricsZindexHeader};
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            background-color: #fff;
          }

          .ScrollPageNavigationBar {
            position: fixed;
            z-index: ${METRICS.MetricsZindexHeader};
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            box-shadow: ${COLORS.boxshadow};
            height: ${METRICS.MetricsHeaderHeight};
            padding-left: 15px;
            padding-right: 15px;
            padding-bottom: 10px;
             {
              /*animation: slideFromTop .2s ease-in;*/
            }
          }

          .ScrollPageNavigationBar .Content {
            padding: 0 15px;
          }

          .Title {
            font-size: 21px;
            line-height: 26px;
            text-align: left;
            color: ${COLORS.ColorForegroundText};
            flex-grow: 1;
            text-decoration: none;
            font-weight: 500;
          }

          .Content {
            display: flex;
            height: 80px;
            align-items: center;
            width: ${METRICS.MetricsContentWidth};
            padding: 0 ${METRICS.MetricsContentPadding};
          }

          .Container {
            flex-grow: 1;
            flex-shrink: 0;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
          }

          .ContainerLeft {
            align-items: flex-start;
            flex-basis: 31%;
            height: 116px;
          }

          .ContainerCenter {
            display: flex;
            flex-basis: 38%;
            justify-content: center;
          }

          .ContainerRight {
            flex-basis: 31%;
            align-items: flex-end;
            text-align: right;
            height: 116px;
          }

          .VehicleAndAreaM2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .AreaM2 {
            font-weight: 500;
            font-size: 24px;
            color: #a6c4ff;
            min-width: 160px;
            margin-left: 10px;
          }

          .AreaHuman {
            margin: 0;
            font-size: 35px;
            font-weight: 500;
            max-width: 463.1px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 1.15em;
          }

          .AboutLink {
            font-size: 18px;
            font-weight: 500;
            line-height: 24px;
            color: ${COLORS.ColorForegroundOrange};
            margin-right: 15px;
            outline: none;
            cursor: pointer;
            text-decoration: none;
          }

          .Container :global(.InfoLabel) {
            color: ${COLORS.ColorForegroundOrange};
            margin-top: 20px;
          }

          .Container :global(.InfoLabel) :global(h3) {
            margin: 0;
            font-size: 24px;
            font-weight: 500;
            max-width: 378.2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2em;
          }

          .Container :global(.InfoLabel) :global(p) {
            margin: 0;
            margin-top: 5px;
            font-size: 24px;
            line-height: 1.2;
            max-width: 400px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          @keyframes slideFromTop {
            0% {
              transform: translate3d(0px, -20vh, 0px);
            }
            100% {
              transform: translate3d(0px, 0px, 0px);
            }
          }

          .SearchWrapper {
            z-index: 10000000;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            display: none;
          }

          .SearchBox {
            padding: 60px;
            width: 600px;
            background: white;
            box-shadow: ${COLORS.boxshadow};
          }

          .SearchInput {
            padding: 0 0 16px 0;
            width: 100%;
            outline: none;
            font-size: 21px;
            border-bottom: 2px solid blue;
            margin-bottom: 20px;
          }

          .SearchResult {
            padding: 20px 0;
            color: ${COLORS.ColorForegroundOrange};
            border-bottom: 1px solid #f2f2f2;
          }

          .SearchResult:hover {
            cursor: pointer;
          }

          .SearchResult:last-child {
            border: none;
            padding: 20px 0 0 0;
          }

          .Searchresultname {
            display: block;
            font-size: 30px;
            margin-bottom: 6px;
          }
          .Searchresultinfo {
            display: block;
            font-size: 16px;
          }

          .NavButtons {
            display: flex;
            flex-direction: row;
          }

          .SearchButton,
          .HomeButton {
            cursor: pointer;
            margin-right: 10px;
          }

          .SearchButton:hover,
          .SearchButton:focus,
          .SearchButton:active,
          .HomeButton:hover,
          .HomeButton:focus,
          .HomeButton:active {
            opacity: 0.5;
          }

          .Link:hover,
          .Link:focus,
          .Link:active {
            opacity: 0.5;
          }

          .SearchButton *,
          .HomeButton * {
            cursor: pointer;
            padding: 0;
          }

          .HomeIcon {
            position: relative;
            bottom: 3px;
          }

          .SearchButton span,
          .HomeButton span {
            margin-left: 5px;
          }

          .SearchButton {
            position: relative;
            top: 4px;
          }
        `}</style>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    ownGuess: state.guess.get('own'),
    citySlug: state.city.getIn(['actual_city', 'slug']),
    cityName: state.city.getIn(['actual_city', 'name']),
    activeVehicle: state.vehicles.get('vehicle'),
    cityLandmark:
      state.cityMeta.getIn(['metaData', 'landmark']) &&
      state.cityMeta.getIn(['metaData', 'landmark']).toJS(),
    laneRailParking: state.lanes.get('laneRailParking').toJS(),
    parkingSpace: state.parking.toJS(),
    lane: state.lanes.toJS()
  };
};

export default connect(mapStateToProps)(Header);
