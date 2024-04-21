import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '@styles/colors';

const Loader = ({isLoading}) => {
  if (!isLoading) {
    return null; // Don't render anything if isLoading is false
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Semi-transparent background
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Loader;
