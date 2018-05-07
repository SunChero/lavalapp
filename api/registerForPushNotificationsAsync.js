import {AsyncStorage} from 'react-native'
import { Constants, Permissions, Notifications } from 'expo';

// Example server, implemented in Rails: https://git.io/vKHKv
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
  console.log(finalStatus)
  if (finalStatus !== 'granted') {
    return;
  }
  
  let token = await Notifications.getExpoPushTokenAsync();
  await AsyncStorage.setItem('@ICILAVAL:NotificationToken', token);
  console.log(token)
  return token;
});
