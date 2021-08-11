import React from 'react';
import Home from '@/pages/home'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator(),
    Navigator = Tab.Navigator,
    Screen = Tab.Screen;
class HomeTopTabs extends React.Component{

    render(){
        return(
            <Navigator
                screenOptions={{
                    lazy: true,
                    tabBarScrollEnabled: true,
                    tabBarItemStyle:{
                        width:120,
                    },
                    tabBarLabelStyle:{
                        fontSize:14
                    },
                    tabBarIndicatorStyle: {
                        width: 20,
                        marginLeft:50,
                        backgroundColor:'#f86442',
                        borderRadius:20,
                        height:4
                    },
                    tabBarActiveTintColor: '#f86442',
                    tabBarInactiveTintColor: '#454545'

                }}

            >
                <Screen name="Home" component={Home}
                    options={{
                        tabBarLabel:'推荐'
                    }}
                />
            </Navigator>
        )
    }
}
export default HomeTopTabs