import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import images from '@assets/images';
import colors from '@styles/colors';

const CustomTextInput = props => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {
    label,
    placeholder,
    isPassword,
    value,
    onChangeText,
    keyboardType,
    inputRef,
    onSubmitEditing,
    returnKeyType,
    autoFocus,
  } = props;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textInputView}>
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          secureTextEntry={isPassword ? secureTextEntry : false}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
        />
        {isPassword && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.passImg}>
            <Image source={images.showPass} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginVertical: 15,
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 15,
    zIndex: 100,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    color: colors.SELECTEDTXT,
    fontSize: 12,
  },
  textInputView: {
    borderWidth: 1,
    borderColor: colors.GRAYWHITE,
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingTop: 5,
    alignItems: 'center',
    height: 50,
    fontSize: 16,
  },
  passImg: {
    right: 15,
    position: 'absolute',
  },
});
export default CustomTextInput;
