import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ThemeProvider, Input } from 'react-native-elements';
import UsersMap from './UsersMap'
import {
  StackNavigator,
} from 'react-navigation'

const theme = {
  Button: {
    raised: true,
  },
}

export default class Home extends React.Component {

  render() {
    return (
      <ThemeProvider theme = {theme}>
        <Input placeholder='BASIC INPUT'/>
        <Input placeholder='BASIC INPUT'/>
        <Button title= "Go" onPress={() =>
            this.props.navigation.navigate('UsersMap')
          } />
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})