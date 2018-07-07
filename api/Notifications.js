import { Notifications, Permissions } from 'expo';

getiOSNotificationPermission = async ()  => {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
  console.log(status)
}
export const ScheduleNotification = (events , options) => {
    getiOSNotificationPermission()
    Notifications.cancelAllScheduledNotificationsAsync()
    events.map(ev => {
        const localnotification = {
            title: ev.locations[0] ? ev.locations[0].Label : "Bonjour Laval",
            body: ev.Title,
            android: { sound: true 
            },
            ios: { sound: true },
          };
         // console.log(Date.now())
          //console.log(moment(parseInt(ev._eventDate)).format("YYYY-MM-DD HH:mm:ss"))
          let sendBeforeOneHour = parseInt(ev._eventDate)
            sendBeforeOneHour -= 1000 *60 * 60;
            const schedulingOptions = { time: sendBeforeOneHour };
            Notifications.scheduleLocalNotificationAsync(
            localnotification,
            schedulingOptions
            );
    })
    
    
};
//   listenForNotifications = () => {
//     Notifications.addListener(notification => {
//       if (notification.origin === 'received' && Platform.OS === 'ios') {
//         Alert.alert(notification.title, notification.body);
//       }
//     });
//   };


