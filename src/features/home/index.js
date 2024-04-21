import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '@styles/globalStyles';
import {FeatureCourses, LiveCourse, Topics} from '@assets/data';
import images from '@assets/images';
import colors from '@styles/colors';
import * as Progress from 'react-native-progress';

const HomeScreen = () => {
  const [topics, setTopics] = useState(Topics);

  const renderLiveCourse = ({item}) => {
    return (
      <View style={styles.renderLiveCourse}>
        <View style={globalStyles.flexDirectionRow}>
          <View>
            <Image source={item.picture} />
            <Image source={images.favourite} style={styles.favourite} />
          </View>
          <View style={styles.liveCourseAuthorView}>
            <Text style={styles.courseName}>{item.courseName}</Text>
            <View style={globalStyles.flexDirectionRow}>
              <Text style={styles.coursesBy}>Courses by: </Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lessonView}>
          <View style={styles.lessonSubView}>
            <View style={styles.completedView}>
              <Text style={styles.lessonText}>{item.totalLesson} Lesson</Text>
              <Text style={styles.completedText}>
                {item.completedLesson} Completed
              </Text>
            </View>
            <View style={{marginTop: 5, width: '100%', paddingEnd: 10}}>
              <Progress.Bar
                progress={item.completedLesson / item.totalLesson}
                width={null}
                color={colors.PRIMARY}
                unfilledColor={'#BADEFB'}
                borderColor="#D9FFFFFF"
              />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={images.playCircle} />
          </View>
        </View>
      </View>
    );
  };

  const onTopicItems = itm => {
    setTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === itm.id ? {...topic, selected: !topic.selected} : topic,
      ),
    );
  };
  const renderTopicsHeader = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.topicsView, item.selected && styles.selectedTopic]}
        onPress={() => onTopicItems(item)}>
        <Text style={styles.topicTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const topicsHeaderComponent = () => (
    <View style={styles.topicsHeaderComponent}>
      <Text style={styles.liveCourseHeaderStyle}>Topics</Text>
      <Text style={styles.SeeAll}>See All</Text>
    </View>
  );

  const featureCoursesHeaderComponent = () => (
    <View style={styles.topicsHeaderComponent}>
      <Text style={styles.liveCourseHeaderStyle}>Feature Courses</Text>
      <Text style={styles.SeeAll}>See All</Text>
    </View>
  );

  const renderFeatureCourses = ({item}) => {
    return (
      <View style={styles.renderFeatureCourses}>
        <Image source={item.picture} style={styles.featureImg} />
        <View
          style={[
            globalStyles.flexDirectionRow,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={styles.courseName}>{item.courseName}</Text>
          <Image source={images.favouriteSelected} />
        </View>
        <View
          style={[
            globalStyles.flexDirectionRow,
            {justifyContent: 'space-between', marginTop: 10},
          ]}>
          <Text>{item.price}</Text>
          <View style={globalStyles.flexDirectionRow}>
            <Image source={images.star} />
            <Text
              style={
                styles.courseName
              }>{`  ${item.rating} (${item.totalRating})`}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.headerView}>
        <View>
          <View style={globalStyles.flexDirectionRow}>
            <Image source={images.profile} />
            <View>
              <Text style={styles.welcome}>Welcome,</Text>
              <Text style={styles.welcomeName}>Ralph Edwards</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Image source={images.search} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginVertical: 10, marginHorizontal: 20}}>
          <FlatList
            data={LiveCourse}
            ListHeaderComponent={() => (
              <Text style={styles.liveCourseHeaderStyle}>Live Course</Text>
            )}
            renderItem={renderLiveCourse}
            keyExtractor={item => item.id}
          />
          {topicsHeaderComponent()}
          <FlatList
            data={topics}
            renderItem={renderTopicsHeader}
            keyExtractor={item => item.id}
            horizontal
            // numColumns={3}
          />
          {featureCoursesHeaderComponent()}
          <FlatList
            data={FeatureCourses}
            renderItem={renderFeatureCourses}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.CULTURED,
  },
  headerView: {
    ...globalStyles.flexDirectionRow,
    height: 35,
    margin: 20,
    justifyContent: 'space-between',
  },
  liveCourseHeaderStyle: {
    fontSize: 20,
    color: '#131A2D',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  renderLiveCourse: {
    backgroundColor: colors.WHITE,
    marginVertical: 5,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 7,
  },
  liveCourseAuthorView: {
    marginLeft: 7,
    width: '75%',
  },
  courseName: {
    fontSize: 14,
    color: colors.MAINTEXT,
    fontWeight: 'bold',
  },
  coursesBy: {
    marginTop: 5,
    fontSize: 12,
    color: '#717681',
  },
  author: {
    marginTop: 5,
    fontSize: 12,
    color: colors.MAINTEXT,
    fontWeight: 'bold',
  },
  lessonView: {
    ...globalStyles.flexDirectionRow,
    marginTop: 10,
  },
  lessonSubView: {
    width: '90%',
  },
  completedView: {
    ...globalStyles.flexDirectionRow,
    justifyContent: 'space-between',
    marginEnd: 10,
  },
  lessonText: {
    fontSize: 12,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  completedText: {
    fontSize: 12,
    color: '#50545C',
  },
  welcome: {
    fontSize: 14,
    color: colors.QUICKSILVER,
    marginLeft: 10,
  },
  welcomeName: {
    fontSize: 14,
    color: colors.MAINTEXT,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  favourite: {
    position: 'absolute',
    right: 5,
    top: 5,
    height: 15,
    width: 15,
  },
  topicsHeaderComponent: {
    ...globalStyles.flexDirectionRow,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SeeAll: {
    fontSize: 15,
    color: '#8D919A',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  topicsView: {
    height: 36,
    borderColor: '#wA0A3AB',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
  },
  topicTitle: {
    color: colors.QUICKSILVER,
  },
  selectedTopic: {
    borderColor: colors.PRIMARY,
  },
  renderFeatureCourses: {
    backgroundColor: colors.WHITE,
    marginHorizontal: 10,
    height: 216,
    width: 210,
    borderRadius: 15,
    padding: 10,
  },
  featureImg: {
    width: 190,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 10,
  },
});

export default HomeScreen;
