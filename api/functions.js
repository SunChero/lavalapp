import { Calendar, Permissions } from 'expo'
import { Platform ,Alert} from 'react-native'
import moment from 'moment'

export const askForCalendarPermissions = async () => {
  const response = await Permissions.askAsync(Permissions.CALENDAR)
  return response.status === 'granted'
}

export const askForReminderPermissions = async () => {
  if (Platform.OS === 'android') {
    return true
  }

  const response = await Permissions.askAsync(Permissions.REMINDERS)
  return response.status === 'granted'
}
export const findCalendars = async () => {
  const calendarGranted = await askForCalendarPermissions()
  const reminderGranted = await askForReminderPermissions()
  let calendars = []

  if (calendarGranted && reminderGranted) {
    calendars = await Calendar.getCalendarsAsync()
  }

  return calendars
}
export const createNewCalendar = async (calendars) => {
  const newCalendar = {
    title: 'LAVAL',
    entityType: Calendar.EntityTypes.EVENT,
    color: '#2196F3',
    sourceId:
      Platform.OS === 'ios'
        ? calendars.find(cal => cal.type === 'caldav').source.id
        : undefined,
    source:
      Platform.OS === 'android'
        ? {
          name: calendars.find(cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER).source.name,
          isLocalAccount: true
        }
        : undefined,
    name: 'LAVAL',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    ownerAccount:
      Platform.OS === 'android'
        ? calendars.find(cal => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER).ownerAccount
        : undefined
  }

  let calendarId = null

  try {
    calendarId = await Calendar.createCalendarAsync(newCalendar)
  } catch (e) {
    Alert.alert('Le calendrier n\'a pas Ã©tÃ© sauvegardÃ©', e.message)
  }

  return calendarId
}
export const addEventsToCalendar = async (calendarId , item) => {
  console.log(item)
  const event = {
    title: item.Title,
    location: item.locations[0].Label,
    startDate: moment(parseInt(item._eventDate)),
    endDate: moment(parseInt(item._endDate)),
    alarms: [{relativeOffset : -1440 } ,{relativeOffset : -60 },{relativeOffset : -15 } , {relativeOffset : 1 }]
  }
  try {
    await Calendar.createEventAsync(calendarId, event)
    
  } catch (e) {
    Alert.alert('Une erreur est survenue lors de l\'ajout de vos indisponiblitÃ© Ã  votre calendrier')
  }
}
export const synchronizeCalendar = async (item) => {
  let calendars = await findCalendars()
  let laval = calendars.find(cal => cal.title === 'LAVAL')
  let calendarId = null;
  laval ? calendarId = laval.id :  calendarId = await createNewCalendar(calendars)
  try {
    await addEventsToCalendar(calendarId , item)
    Alert.alert('Le calendrier a Ã©tÃ© synchronisÃ©')
  } catch (e) {
    Alert.alert('Une erreur est survenue lors de l\'ajout des Ã©vÃ¨nements au calendrier', e.message)
  }
}
getAllEvents = async  calendarId => {
 let events =  await Calendar.getEventsAsync([calendarId] , new Date().setFullYear( new Date().getFullYear() -1)  ,  new Date().setFullYear( new Date().getFullYear() +1))
 return events
}
clearAllEvents =  async  calendarId =>{
  let events = await this.getAllEvents(calendarId)
  events.map( ev => Calendar.deleteEventAsync(ev.id))
}
export const reset = async () =>{
  let calendars = await findCalendars()
  let laval = calendars.find(cal => cal.title === 'LAVAL')
  let calendarId = null;
 laval ?  await Calendar.deleteCalendarAsync(laval.id) : null
}
export const Sync = async (events) => {
  let calendars = await findCalendars()
  let laval = calendars.find(cal => cal.title === 'LAVAL')
  let calendarId = null;
  laval ? calendarId = laval.id :  calendarId = await createNewCalendar(calendars)
  try {
    this.clearAllEvents(calendarId)
    events.map(e => addEventsToCalendar(calendarId , e))
  } catch (e) {
    console.warn('Une erreur est survenue lors de l\'ajout des Ã©vÃ¨nements au calendrier', e.message)
  }
}