import Transaction from "../src/transaction.js";

describe("Transaction tests", () => {
    it("should create a new instance of the Transaction class",() => {
        //Arrange

        //Act
        const testTransaction = new Transaction("01/01/2021", 100, 0);

        //Assert
        expect(testTransaction).toBeInstanceOf(Transaction);
    });
    it("should return the date of the transaction", () => {
        //Arrange
        const testTransaction = new Transaction("01/01/2021", 100, 0);

        //Act
        const result = testTransaction.getDate();

        //Assert
        expect(result).toEqual("01/01/2021");
    });
    it("should return the credit of the transaction", () => {
        //Arrange
        const testTransaction = new Transaction("01/01/2021", 100, 0);

        //Act
        const result = testTransaction.getCredit();

        //Assert
        expect(result).toEqual(100);
    });
    it("should return the debit of the transaction", () => {
        //Arrange
        const testTransaction = new Transaction("01/01/2021", 0, 100);

        //Act
        const result = testTransaction.getDebit();

        //Assert
        expect(result).toEqual(100);
    });
    it("should return the balance of the transaction", () => {
        //Arrange
        const testTransaction = new Transaction("01/01/2021", 0, 100);
        testTransaction.setBalance(100);

        //Act
        const result = testTransaction.getBalance();

        //Assert
        expect(result).toEqual(100);
    });
    it("should return the details of the transaction", () => {
        //Arrange
        const testTransaction = new Transaction("01/01/2021", 0, 100);
        testTransaction.setBalance(100);

        //Act
        const result = testTransaction.getDetails();

        //Assert
        expect(result).toEqual({
            date: "01/01/2021",
            credit: undefined,
            debit: 100,
            balance: 100
        });
    });
});