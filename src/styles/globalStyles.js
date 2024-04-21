import {StyleSheet} from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  txt_header: {
    fontSize: 30,
    color: colors.SELECTEDTXT,
    fontWeight: 'bold',
  },
});

export default globalStyles;
