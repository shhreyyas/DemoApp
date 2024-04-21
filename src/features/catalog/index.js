import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData, searchData } from '@redux/apiSlice';


const CatalogScreen = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const apiData = useSelector(state => state.api.data);

  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const handleSearch = () => {
     if (searchText.trim() === '') {
       dispatch(fetchApiData()); 
     } else {
       dispatch(searchData(searchText));
     }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={apiData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CatalogScreen;