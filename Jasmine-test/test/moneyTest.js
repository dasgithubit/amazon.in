import { currencyFormat } from "../../scripts/utils/money.js";

console.log('test suite: Currency format');

console.log(' the code works in cents ');

if(currencyFormat(2095) === '20.95') {
    console.log('Passed');
}
else {
    console.log('Failed');
}

console.log('work with 0');

if(currencyFormat(0) === '0.00') {
    console.log('passed');
}
else {
    console.log('failed');
}

console.log('work with round with cents');

if(currencyFormat(2000.5) === '20.01') {
    console.log('passed');
}
else {
    console.log('failed');
}

