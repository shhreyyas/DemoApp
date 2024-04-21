import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import globalStyles from '@styles/globalStyles';
import images from '@assets/images';
import {FeatureCourses} from '@assets/data';
import colors from '@styles/colors';

const CourseScreen = () => {
  const renderFeatureCourses = ({item}) => {
    return (
      <View style={styles.renderITM}>
        <Image source={item.picture} />

        <View style={styles.leftView}>
          <Text style={styles.courseName}>{item.courseName}</Text>
          <View style={styles.lessonView}>
            <View style={styles.lessonView}>
              <Image source={images.lesson} />
              <Text> {item.totalLesson} Lesson</Text>
            </View>
            <View style={styles.lessonView}>
              <Image source={images.time} />
              <Text> {item.time}</Text>
            </View>
          </View>
          <View style={styles.lessonView}>
            <Text>{item.price}</Text>
            <TouchableOpacity style={styles.enroll}>
              <Text style={styles.enrollTxt}>Enroll Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.headerView}>
        <Text style={styles.catalog}>Catalog</Text>
        <TouchableOpacity>
          <Image source={images.search} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          data={FeatureCourses}
          renderItem={renderFeatureCourses}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    ...globalStyles.flexDirectionRow,
    height: 35,
    margin: 20,
    justifyContent: 'space-between',
  },
  catalog: {
    fontSize: 18,
    color: colors.MAINTEXT,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.CULTURED,
  },
  renderITM: {
    ...globalStyles.flexDirectionRow,
    backgroundColor: colors.WHITE,
    height: 146,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  leftView: {
    marginLeft: 15,
    width: '60%',
  },
  courseName: {
    color: colors.MAINTEXT,
  },
  lessonView: {
    ...globalStyles.flexDirectionRow,
    justifyContent: 'space-between',
    paddingRight: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  enroll: {
    borderWidth: 1,
    paddingHorizontal: 15,
    marginEnd: 5,
    paddingVertical: 8,
    borderColor: colors.PRIMARY,
    borderRadius: 20,
  },
  enrollTxt: {
    color: colors.PRIMARY,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CourseScreen;
