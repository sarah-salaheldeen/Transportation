/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AppRegistry, StyleSheet, Text, View, Button} from 'react-native';
import AppNavigator from './components/AppNavigator'
import UsersMap from './components/UsersMap';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//type Props = {};
export default class App extends React.Component {
    constructor(props){
        super(props)

        /*this.state = {
            mapRegion: null,
            gpsAccuracy: null
        }
        watchID = null
    }
        componentWillMount(){
            this.watchID = navigator.geolocation.watchPosition	((position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421
                }
                this.onRegionChange(region, position.coords.accuracy)
            })
        }

        componentWillUnmount(){
            navigator.geolocation.clearWatch(this.watchID)
        }
        
        onRegionChange(region, gpsAccuracy){
            this.setState({
                mapRegion: region,
                gpsAccuracy: gpsAccuracy
            }) */
        } 

    render() {
        //const {mapRegion} = this.state

       // if (mapRegion) {
        return (
            <AppNavigator />
           // <View>
               // <UsersMap {...this.state} onRegionChange={this.onRegionChange.bind(this)}/>
           // </View>
            )
       // }

       /* else{
            return (
                <View>
                    <Text>There is no mapRegion</Text>
                </View>
            );
        } */
    }
}
 
const styles = StyleSheet.create(
{
   container:
   {
      justifyContent: 'center',
      flex:1,
      margin: 10
    
   },
 
   ActivityNameTextCss:
   {
      fontSize: 22,
      color: 'black',
      textAlign: 'center',
   },
 
});
