import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, {Marker, AnimatedRegion, Animated, mapRegion, onRegionChange, Callout} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import {SearchBar} from 'react-native-elements'

const GOOGLE_MAPS_APIKEY = 'AIzaSyCHyVNEOn3jDR8KSJe_p6ZGDwt5lpeEYeE'

 var userLocationMarker = null
 var SQLite = require('react-native-sqlite-storage')
 var db = SQLite.openDatabase({name: 'a' , createFromLocation : "~data/transit.db"}, this.openCB, this.errorCB)

export default class UsersMap extends React.Component {
    constructor(props){
        super(props)
       /*console.log("Heeey: " , this.props.mapRegion)
        //let userLocationMarker = null;
        if (this.props.mapRegion) {
            console.log("It's working !!!")
          userLocationMarker = <MapView.Marker coordinate={props.mapRegion} />;
        } */
        this.state = {
            mapRegion: null,
            gpsAccuracy: null,

            originLat: null,
            originLong: null,
            destLat: null,
            destLong: null,
            waypoints: [],
            search: '',
            userLocationMarker: null,
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
        })
        if(this.state.mapRegion){
            console.log("Where is the marker !")
            this.setState({
                userLocationMarker: <MapView.Marker coordinate={this.state.mapRegion} />
            })
        }
    }



componentDidMount(){   
            db.executeSql('SELECT * FROM lines WHERE line_id=?', [1] , (results) => {
                var len = results.rows.length
                if(len>0){
                    //lat exist 
                    var row = results.rows.item(0)
                    this.setState({originLat: row.org_lat})
                    console.log("originLatXXXXXXX: " + this.state.originLat)

                    this.setState({originLong: row.org_long})

                    this.setState({destLat: row.dest_lat})

                    this.setState({destLong: row.dest_long})

                    this.setState({waypoints:row.waypoints.split('-')})
                    console.log(this.state.waypoints)
                }
            })
    }

    updateSearch = search => {
        this.setState({ search });
      }

     render() {
         return(
            <View>
     <MapView 
        initialRegion={{
            latitude: 15.5007,
              longitude: 32.5599,
              latitudeDelta: 0.0622, 
              longitudeDelta: 0.0421,
        }}
        region={this.state.mapRegion}
        style={styles.map}
         >
          {this.state.userLocationMarker}
        </MapView>
        <Callout>
        <SearchBar
        containerStyle= {styles.containerStyle}
        inputContainerStyle= {styles.inputContainerStyle}
        round
        lightTheme
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={this.state.search}
    />
        </Callout>
        </View>
         )
    }
}
        const styles = StyleSheet.create({
            mapContainer: {
                width: '100%', 
                height: '90%'
            },
            map: {
                width: '100%',
                height: '100%',
                marginTop: 20
            },

            containerStyle: {
                flexDirection: 'row',
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                //borderRadius: 10,
                //width: "40%",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30
              },
              inputContainerStyle: {
                  flex: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                //borderColor: "transparent",
                //marginLeft: "10%",
                //width: "90%",
                //marginRight: "10%",
                //height: 40,
                //borderWidth: 0.0  
              }
    })
