import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserType} from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import User from '../components/User';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Native Chat</Text>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Ionicons
            onPress={() => navigation.navigate('Chats')}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate('Friends')}
            name="group"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://10.0.2.2:8000/users/${userId}`)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.log('error retrieving users', error);
        });
    };

    fetchUsers();
  }, []);

  console.log('users', users);

  return (
    <View>
      <View style={{padding: 10}}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
