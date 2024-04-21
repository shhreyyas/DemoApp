import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import globalStyles from '@styles/globalStyles';
import images from '@assets/images';
import colors from '@styles/colors';
import CustomTextInput from '@components/CustomTextInput';
import {BOTTOMTAB, HOME} from '@navigation/screenName';
import {useDispatch} from 'react-redux';
import {signIn, signUp} from '@redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@components/Loader';

const SignInScreen = props => {
  const {navigation} = props;
  const [signUP, setSignUP] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const inputs = {
    email: useRef(null),
  };
  const dispatch = useDispatch();

  const validateEmail = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const onSiginIn = () => {
    setSignUP(false);
  };

  const onSiginUp = () => {
    setSignUP(true);
  };

  const focusNextField = key => {
    if (inputs[key]) {
      inputs[key]?.current?.focus();
    }
  };

  const handleSignUp = async () => {
    if (signUP && !name) {
      Alert.alert('Error', 'Name is required');
    } else if (!email) {
      Alert.alert('Error', 'Email is required');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter valid Email');
    } else if (!password) {
      Alert.alert('Error', 'Password is required');
    } else if (password < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
    } else if (signUP && !rePassword) {
      Alert.alert('Error', 'Re-Password is required');
    } else if (signUP && rePassword < 6) {
      Alert.alert('Error', 'Re-Password must be at least 6 characters');
    } else if (signUP && password !== rePassword) {
      Alert.alert('Error', 'Password and Re-Password are not match');
    } else {
      if (signUP) {
        setLoading(true);
        dispatch(signUp({name, email, password, rePassword}));
        setSignUP(false);
        setLoading(false);
      } else {
        setLoading(true);
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        if (user.email == email && user.password == password) {
          dispatch(signIn({email, password}));
          setLoading(false);
          navigation.navigate(BOTTOMTAB);
        } else {
          setLoading(false);
          Alert.alert('Error', 'Invalid email or password.');
        }
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <Image source={images.headerLogo} style={styles.headerLogo} />
        <Text style={styles.txt_header}>Welcome</Text>
        <View style={styles.selectedView}>
          <TouchableOpacity
            style={[
              styles.selectedTouchView,
              !signUP && {backgroundColor: colors.WHITE},
            ]}
            onPress={onSiginIn}>
            <Text>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectedTouchView,
              signUP && {backgroundColor: colors.WHITE},
            ]}
            onPress={onSiginUp}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldView}>
          {signUP && (
            <CustomTextInput
              label="Name"
              placeholder="Enter username"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
              onSubmitEditing={() => focusNextField('email')}
            />
          )}
          <CustomTextInput
            refField={inputs.email}
            label={signUP ? 'Email' : 'Email / Username'}
            placeholder={
              signUP ? 'Enter your email' : 'Enter your email / username'
            }
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => focusNextField('password')}
          />
          <CustomTextInput
            refField={inputs.password}
            label="Password"
            placeholder="Enter your password"
            icon="lock"
            isPassword
            value={password}
            onChangeText={setPassword}
            returnKeyType="next"
            onSubmitEditing={() => focusNextField('rePassword')}
          />
          {signUP && (
            <CustomTextInput
              refField={inputs.rePassword}
              label="Re-enter Password"
              placeholder="Re-enter your password"
              icon="lock"
              isPassword
              returnKeyType="done"
              value={rePassword}
              onChangeText={setRePassword}
            />
          )}
        </View>
        {!signUP && (
          <View style={styles.rememberView}>
            <Text style={styles.signInText}>Remember me</Text>
            <Text style={styles.signInLink}>Forgot Password</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleSignUp} style={styles.submitBtn}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.devideView}>
          <View style={styles.devideLine} />
          <Text style={styles.devideText}>Or Continue with</Text>
          <View style={styles.devideLine} />
        </View>

        <View style={styles.socialView}>
          <TouchableOpacity style={styles.socialBtn}>
            <Image source={images.facebook} />
            <Text style={styles.socialTxt}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Image source={images.google} />
            <Text style={styles.socialTxt}>Google</Text>
          </TouchableOpacity>
        </View>
        {signUP && (
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <Text style={styles.signInLink} onPress={() => setSignUP(false)}>
              {' '}
              Sign in
            </Text>
          </View>
        )}
      </ScrollView>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  headerLogo: {
    alignSelf: 'center',
    marginTop: 20,
  },
  txt_header: {
    ...globalStyles.txt_header,
    textAlign: 'center',
    marginTop: 30,
  },
  selectedView: {
    height: 35,
    backgroundColor: colors.METAL,
    borderRadius: 16,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  selectedTouchView: {
    height: 28,
    width: '48%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldView: {
    marginTop: 20,
  },
  submitBtn: {
    marginTop: 25,
    backgroundColor: colors.PRIMARY,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    color: colors.WHITE,
  },
  devideView: {
    ...globalStyles.flexDirectionRow,
    marginTop: 15,
  },
  devideLine: {
    borderColor: colors.GRAYWHITE,
    borderWidth: 0.6,
    flex: 1,
    alignSelf: 'center',
  },
  devideText: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: 13,
  },
  socialView: {
    ...globalStyles.flexDirectionRow,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  socialBtn: {
    ...globalStyles.flexDirectionRow,
    height: 42,
    width: '45%',
    borderWidth: 1,
    borderColor: colors.GRAYWHITE,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  socialTxt: {
    fontSize: 16,
    color: colors.LIGHTGRAY,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
  },
  signInLink: {
    fontSize: 14,
    color: colors.PRIMARY, // Red color
    fontWeight: 'bold',
  },
  rememberView: {
    ...globalStyles.flexDirectionRow,
    justifyContent: 'space-between',
  },
});
export default SignInScreen;
