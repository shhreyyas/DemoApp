import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ACCOUNT, CATALOG, COURSE, HOME} from './screenName';
import HomeScreen from '@features/home';
import images from '@assets/images';
import CourseScreen from '@features/course';
import CatalogScreen from '@features/catalog';
import AccountScreen from '@features/account';
import colors from '@styles/colors';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={HOME}
      tabBarOptions={{
        activeTintColor: colors.BLACK,
        inactiveTintColor: colors.QUICKSILVER,
      }}>
      <Tab.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.selectedLabel : styles.label}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image source={focused ? images.homeFilled : images.home} />
          ),
        }}
      />
      <Tab.Screen
        name={COURSE}
        component={CourseScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.selectedLabel : styles.label}>
              Cource
            </Text>
          ),
          tabBarIcon: ({color, focused}) => (
            <Image
              source={images.cource}
              style={{tintColor: focused ? colors.BLACK : colors.GREY}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={CATALOG}
        component={CatalogScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.selectedLabel : styles.label}>
              Catalog
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image source={focused ? images.catalogFilled : images.catalog} />
          ),
        }}
      />
      <Tab.Screen
        name={ACCOUNT}
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.selectedLabel : styles.label}>
              Account
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={images.account}
              style={{tintColor: focused ? colors.BLACK : colors.GREY}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.QUICKSILVER,
  },
  selectedLabel: {
    fontSize: 12,
    color: colors.MAINTEXT,
    fontWeight: 'bold',
  },
});
export default BottomTabNavigator;
