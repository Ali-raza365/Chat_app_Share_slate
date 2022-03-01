/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Example} from './example';
// import {Welcome} from './welcome';
// import {Preview} from './preview';

const Routes = {
    // index: Welcome,
    rich: Example,
    // preview: Preview,
};

 type Props = {};
type State = {
    routeKey: string,
};

function RichEd (){
  const  state = {
        routeKey: 'index',
        args: {},
    }

 const  push = (routeKey, args) => {
        Routes[routeKey] && this.setState({routeKey, args});
    }

        let that = this;
        let {routeKey, args = {}} = state;
        let Comp = Routes[routeKey];
        return <Comp navigation={that} {...args} />;
    }

export default RichEd;
