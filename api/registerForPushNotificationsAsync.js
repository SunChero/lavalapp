import {AsyncStorage} from 'react-native'
import { Permissions, Notifications } from 'expo';
const PUSH_ENDPOINT = 'https://expo-push-server.herokuapp.com/tokens';

export default (async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
   if (finalStatus !== 'granted') {
    return;
  }
  
  let token = await Notifications.getExpoPushTokenAsync();
  await AsyncStorage.setItem('@ICILAVAL:NotificationToken', token);
  return token;
});
