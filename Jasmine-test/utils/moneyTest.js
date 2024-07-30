import { currencyFormat } from "../../scripts/utils/money.js";

// jasmine framework give us a website to run the test cases in the organized format
// we have to mention the describe keyword to make a group of the test case

describe('Test suite: currency format', () => {
    it('works with cents', () => {
        expect(currencyFormat(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(currencyFormat(0)).toEqual('0.00');
    });

    it('works with round of cents', () => {
        expect(currencyFormat(2000.5)).toEqual('20.01');
    });
});