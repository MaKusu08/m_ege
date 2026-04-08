import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { IMG, ROUTES } from '../../utils';

const Login = () => {
  const navigation = useNavigation();

  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 Handle Login
  const handleLogin = async () => {
    if (!emailAdd || !password) {
      Alert.alert(
        'Invalid Credentials',
        'Please enter valid email address and password'
      );
      return;
    }

    try {
      const response = await fetch('http://192.168.254.111:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAdd,
          password: password,
        }),
      });

      const data = await response.json();

      console.log('RESPONSE:', data);

      // ❌ If login failed
      if (!response.ok) {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
        return;
      }

      // ✅ Get token (supports both formats)
      const token = data.token || data.access_token;

      if (!token) {
        Alert.alert('Error', 'No token received from server');
        return;
      }

      console.log('TOKEN:', token);

      // ✅ Save token
      await AsyncStorage.setItem('token', token);

      Alert.alert('Success', 'Login successful!');

      // Navigate to home
      navigation.navigate(ROUTES.HOME);

    } catch (error) {
      console.log('ERROR:', error);
      Alert.alert('Error', 'Network request failed');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Logo */}
      <Image
        source={IMG.LOCAL_LOGO}
        style={{ width: 150, height: 150, marginBottom: 20 }}
        resizeMode="contain"
      />

      {/* Inputs */}
      <View style={{ width: '50%' }}>
        <CustomTextInput
          label="Email Address"
          placeholder="Enter Email Address"
          value={emailAdd}
          onChangeText={setEmailAdd}
          containerStyle={{ padding: 5 }}
          textStyle={{
            borderRadius: 10,
            color: 'black',
            marginLeft: 10,
            fontWeight: 'bold',
          }}
        />

        <CustomTextInput
          label="Password"
          placeholder="Enter Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          containerStyle={{ padding: 5 }}
          textStyle={{
            borderRadius: 10,
            color: 'black',
            marginLeft: 10,
          }}
        />
      </View>

      {/* Login Button */}
      <CustomButton
        label="LOGIN"
        containerStyle={{
          backgroundColor: 'orange',
          borderRadius: 10,
          marginVertical: 20,
          width: '30%',
        }}
        textStyle={{
          color: 'white',
          fontWeight: 'bold',
        }}
        onPress={handleLogin}
      />

      {/* Register */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Create an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text style={{ color: 'orange', marginLeft: 10, fontWeight: 'bold' }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;