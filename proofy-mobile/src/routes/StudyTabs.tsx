import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

Ionicons.loadFont();

const StudyTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 74 : 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: Platform.OS === 'ios' ? 15 : 0,
        },
        safeAreaInsets: {
          bottom: 0,
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: Platform.OS === 'ios' ? 24 : 20, // Linha modificada
        },
        labelStyle: {
          fontFamily: 'Archivo-bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="easel-outline"
              size={size}
              color={focused ? '#8257e5' : color}
            />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="heart-outline"
              size={size}
              color={focused ? '#8257e5' : color}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default StudyTabs;
