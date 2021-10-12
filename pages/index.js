import React, { Component } from 'react';
import axios from 'axios';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Home from '../app/home/Home';
import Header from '../app/shared/components/Header';

import { CityActions, GuessActions } from '../app/statemanagement/actions';
import { setBaseUrl, initRouterWatcher } from '../app/statemanagement/AppStateManagement';

import { getBaseUrl } from '../app/shared/utils/url';

class Index extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req } = params;
    console.log('Index page render');
    if (isServer) {
      const baseUrl = getBaseUrl(req);
      await store.dispatch(setBaseUrl(baseUrl));
      await store.dispatch(CityActions.loadCities());
      // We may render from city/:cityName and select that city by default
      if(req && req.params.cityName) {
        await store.dispatch(CityActions.selectCity(req.params.cityName));
      } else {
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // Try to get closest city from api
        await axios.post(`${baseUrl}/api/v1/nearestCity`,{
          ip: clientIP
        }).then((response) => {
          console.log('closest city is')
          return store.dispatch(CityActions.selectCity(response.data.slug));
        }, (error) => {
          // default to berlin
          console.log('default to berlin')
          return store.dispatch(CityActions.selectCity("berlin"));
        });
      }
      if(req && req.query && req.query.bike && req.query.rail && req.query.car) {
        await store.dispatch(GuessActions.setOwnGuess({
          bike: parseFloat(req.query.bike),
          rail: parseFloat(req.query.rail),
          car: parseFloat(req.query.car)
        }));
      } else {
        await store.dispatch(GuessActions.setOwnGuess({
          bike: 0.33,
          rail: 0.33,
          car: 0.33
        }));
      }
    }
    return;
  }

  componentDidMount() {
    // Triggered on client
    this.props.dispatch(initRouterWatcher());
  }

  render() {
    return (
      <Layout>
        <Header
          title="What the Street!?"
          mode="normal"
        />
        <Home />
      </Layout>
    )
  }
}

export default withRedux(initStore)(Index);
