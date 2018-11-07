import {createStackNavigator} from 'react-navigation'
import Home from '../Containers/Screens/Home'
import Results from '../Containers/Screens/Results'


const AppNavigator = createStackNavigator({
    Home: {screen: Home},
    Results: {screen: Results}
})

export default AppNavigator