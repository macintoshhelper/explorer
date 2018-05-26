import * as API from '../api';
import store from './store';

const ACTION_STARTUP_DATA = 'ACTION_STARTUP_DATA';

export function reducer (state = initialState, action) {
  switch (action.type) {
    case ACTION_STARTUP_DATA:
      if (action.devices.length === 1 && !state.dongleId) {
        state.dongleId = action.devices[0].dongle_id;
      }
      state.devices = action.devices;
      return state;
      break;
    default:
      return state;
  }
}

export default async function init () {
  console.log('Fetching devices!');
  var devices = await API.listDevices();
  console.log(devices);

  store.dispatch({
    type: ACTION_STARTUP_DATA,
    devices: devices
  });
}
