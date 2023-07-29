import { TimeType } from "../helpers/propTypes";
import * as dateFns from 'date-fns';
export default function convertTime (timestamp: TimeType) {
  // console.log('timestamp in convert----: ', timestamp)
  const temp:number = (timestamp._seconds + timestamp._nanoseconds * 0.00000001) * 1000;
  // const time = dateFns.formatDistanceToNow(temp);
  return dateFns.formatDistanceToNowStrict(temp)
}