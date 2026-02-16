import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IMG, ROUTES } from '../utils';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
      }}
    >
      <Text style={{ fontSize: 20 }}>HomeScreen</Text>

      {/* <Button title="GO TO PROFILE" /> */}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.PROFILE);
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Text>GO TO PROFILE</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;