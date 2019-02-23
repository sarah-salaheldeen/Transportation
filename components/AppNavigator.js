import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './Home'
import UsersMap from './UsersMap'

const AppNavigator = createStackNavigator({
    UsersMap: { screen: UsersMap },
    Home: { screen: Home },
})

//const App = createAppContainer(AppNavigator)
export default createAppContainer(AppNavigator)