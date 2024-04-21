import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import globalStyles from '@styles/globalStyles';
import images from '@assets/images';
import colors from '@styles/colors';
import {AUTHSTACK, BOTTOMTAB} from '@navigation/screenName';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainSplash = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await AsyncStorage.getItem('user');
      setTimeout(() => {
        if (user) {
          navigation.replace(BOTTOMTAB);
        } else {
          navigation.replace(AUTHSTACK);
        }
      }, 1500);
      if (user) {
        dispatch({type: 'auth/signIn', payload: JSON.parse(user)});
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <View style={[globalStyles.containerCenter, styles.mainComponent]}>
      <StatusBar backgroundColor={colors.PRIMARY} barStyle="light-content" />
      <Image source={images.splashLogo} style={styles.splash} />
    </View>
  );
};
const styles = StyleSheet.create({
  splash: {},
  mainComponent: {
    backgroundColor: colors.PRIMARY,
  },
});
export default MainSplash;
