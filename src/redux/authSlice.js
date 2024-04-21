import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      try {
        state.user = action.payload;
      } catch (e) {
        console.error(e);
      }
    },
    signUp: (state, action) => {
      try {
        AsyncStorage.setItem('user', JSON.stringify(action.payload));
        state.user = action.payload;
      } catch (e) {
        console.error(e);
      }
    },
    signOut: state => {
      try {
        AsyncStorage.removeItem('user');
        state.user = null;
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export const {signIn, signUp, signOut} = authSlice.actions;

export default authSlice.reducer;
