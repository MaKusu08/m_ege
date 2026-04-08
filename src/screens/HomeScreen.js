import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch protected API data
  const fetchProtectedData = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // get saved JWT
      if (!token) {
        console.log('No token found!');
        setLoading(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // attach JWT
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch protected data');
      }

      const json = await response.json();
      setData(json); // save API response
      setLoading(false);
    } catch (error) {
      console.log('Error fetching API:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProtectedData(); // fetch when screen mounts
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen!</Text>
      {data ? (
        <View>
          <Text>Message: {data.message}</Text>
          <Text>User: {data.user}</Text>
          <Text>Roles: {data.roles.join(', ')}</Text>
        </View>
      ) : (
        <Text>No data received</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;