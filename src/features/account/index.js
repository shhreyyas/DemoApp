import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '@styles/globalStyles';
import colors from '@styles/colors';
import {useDispatch} from 'react-redux';
import {signOut} from '@redux/authSlice';
import {AUTHSTACK} from '@navigation/screenName';
import Loader from '@components/Loader';

const AccountScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleSignOut = () => {
    setLoading(true);
    dispatch(signOut());
    setLoading(false);
    navigation.navigate(AUTHSTACK);
  };
  return (
    <View style={styles.mainContainer}>
      <Text>You are logged in!</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.submitBtn}>
        <Text style={styles.btnText}>SignOut</Text>
      </TouchableOpacity>
      <Loader isLoading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...globalStyles.mainContainer,
    alignItems: 'center',
    paddingTop: 25,
  },
  submitBtn: {
    marginTop: 25,
    backgroundColor: colors.PRIMARY,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  btnText: {
    fontSize: 16,
    color: colors.WHITE,
  },
});
export default AccountScreen;
