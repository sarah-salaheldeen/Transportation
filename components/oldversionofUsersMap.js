import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, {AnimatedRegion, Animated} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
//import data from './waypoints.json'

 /* const origin = {latitude: this.state.originLat, longitude: this.state.originLong}
const destination = {latitude: this.state.destLat, longitude: this.state.destLong} */
const GOOGLE_MAPS_APIKEY = 'AIzaSyCHyVNEOn3jDR8KSJe_p6ZGDwt5lpeEYeE'
/* const waypoints= [{latitude: 15.57779, longitude: 32.578318}, 
                  {latitude:15.57861, longitude: 32.580586} ,
    
                  {latitude:15.579835, longitude: 32.580489},
    
    
                  {latitude:15.579009, longitude: 32.575758}] */


 var userLocationMarker = null
 var SQLite = require('react-native-sqlite-storage')
 var db = SQLite.openDatabase({name: 'a'}, this.openCB, this.errorCB)

export default class UsersMap extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            originLat: 15.536260,
            originLong: 32.583712,
            destLat: 15.60885,
            destLong: 32.554088,
            waypoints: [{latitude: 15.536261, longitude: 32.583712},
                        {latitude: 15.536261, longitude: 32.583712},
                        {latitude: 15.536261, longitude: 32.583712},
                        {latitude: 15.536261, longitude: 32.583712},
                        {latitude: 15.536261, longitude: 32.583712},
                        {latitude: 15.536261, longitude: 32.583712},
                        {latitude: 15.536261, longitude: 32.583712},
                        {latitude: 15.536261, longitude: 32.583712}
                       ]
        }

    
        //console.log("originLat: " + this.state.originLat)
    }

componentDidMount(){
        if(this.props.mapRegion){
            userLocationMarker = <MapView.Marker coordinate = {this.props.mapRegion} />
        }
        
        
            db.executeSql('SELECT * FROM lines WHERE line_id=?', [1] , (results) => {
                var len = results.rows.length
                var lines = require('./lines.json')
                if(len>0){
                    //lat exist 
                    var row = results.rows.item(0)
                    this.setState({originLat: row.org_lat})
                    console.log("originLatXXXXXXX: " + this.state.originLat)
                   // row = results.rows.item(4)
                    this.setState({originLong: row.org_long})
                    //row = results.rows.item(5)
                    this.setState({destLat: row.dest_lat})
                    //row = results.rows.item(6)
                    this.setState({destLong: row.dest_long})
                    //row = results.rows.item(7)
                    var file = 'waypoints.json'
                    var data = require('./' + file)
                    this.setState({waypoints: data.wps})
                    console.log(this.state.waypoints)
                    
                }
            })
        
    }

     render() {
         return(
     <MapView 
        initialRegion={{
            latitude: 15.5007,
              longitude: 32.5599,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0421,
        }}
        region={this.props.mapRegion}
        style={styles.map}
         >
          {userLocationMarker}
          <MapViewDirections 
            origin={{latitude: parseFloat(this.state.originLat), longitude: parseFloat(this.state.originLong)}}
            destination={{latitude: parseFloat(this.state.destLat), longitude: parseFloat(this.state.destLong)}}
            waypoints= {this.state.waypoints}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink" 
            onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
            }}
             />
        </MapView>
        
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
            }
    })
