import moment from 'moment';

const date1 = new Date();
const res = moment(date1).subtract(1, 'hour').valueOf();
console.log(res)
console.log(date1.getTime())

console.log(date1.getTime() - res)