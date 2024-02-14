import Account from "../src/account.js";

class MockTransaction{
    #date;
    #credit;
    #debit;
    #balance;
    constructor(date, credit, debit){
        this.#date = date;
        if (credit != 0){
            this.#credit = credit;
        }
        if (debit != 0){
            this.#debit = debit;
        }
    }
    getDate(){
        return this.#date;
    }
    getCredit(){
        if (!this.#credit){
            return;
        }
        return this.#credit;
    }
    getDebit(){
        if (!this.#debit){
            return;
        }
        return this.#debit;
    }

    getBalance(){
        return this.#balance;
    }

    setBalance(balance){
        this.#balance = balance;
    }
    getDetails(){
        return {
            date: this.#date,
            credit: this.#credit,
            debit: this.#debit,
            balance: this.#balance
        }
    }
}

describe("Account tests", () => {
    it("should create a new instance of the Account class",() => {
        //Arrange

        //Act
        const testAccount = new Account();

        //Assert
        expect(testAccount).toBeInstanceOf(Account);
    });
    describe("depositFunds tests", () => {
        it("should add the amount to the balance", () => {
            // Arrange
            const testAccount = new Account();
            const testDeposit = new MockTransaction("01/01/2024", 100, 0);

            // Act
            testAccount.depositFunds(testDeposit);

            // Assert
            expect(testAccount.getBalance()).toEqual(100);
            
        });
        it("should correctly increase the balance when two deposits are made", () => {
            // Arrange
            const testAccount = new Account();
            const testDeposit = new MockTransaction("01/01/2024", 100, 0);
            const testDeposit2 = new MockTransaction("01/01/2024", 500, 0);
            // Act
            testAccount.depositFunds(testDeposit);
            testAccount.depositFunds(testDeposit2);

            // Assert
            expect(testAccount.getBalance()).toEqual(600);
            
        });
        it("should create and save the transaction to the transactionHistory array", () => {
            // Arrange
            const testAccount = new Account();
            const testDeposit = new MockTransaction("01/01/2024", 100, 0);

            // Act
            testAccount.depositFunds(testDeposit);

            // Assert
            expect(testAccount.getTransactionHistory()[0]).toEqual(testDeposit);
        });
    });
    describe("withdrawFunds tests", () => {
        it("should subtract the amount from the balance", () => {
            // Arrange
            const testAccount = new Account();
            const testDeposit = new MockTransaction("01/01/2024", 100, 0);
            const testWithdrawal = new MockTransaction("01/01/2024", 0, 100);

            // Act
            testAccount.depositFunds(testDeposit);
            testAccount.withdrawFunds(testWithdrawal);

            // Assert
            expect(testAccount.getBalance()).toEqual(0);
            
        });
        it("should not allow withdrawal if the balance is less than the withdrawal amount", () => {
            // Arrange
            const testAccount = new Account();
            const testDeposit = new MockTransaction("01/01/2024", 100, 0);
            const testWithdrawal = new MockTransaction("01/01/2024", 0, 200);

            // Act
            testAccount.depositFunds(testDeposit);
            testAccount.withdrawFunds(testWithdrawal);

            // Assert
            expect(testAccount.getBalance()).toEqual(100);
            
        });
        it("should create and save the transaction to the transactionHistory array", () => {
            // Arrange
            const testAccount = new Account();
            const testDeposit = new MockTransaction("01/01/2024", 100, 0);
            const testWithdrawal = new MockTransaction("01/01/2024", 0, 100);

            // Act
            testAccount.depositFunds(testDeposit);
            testAccount.withdrawFunds(testWithdrawal);

            // Assert
            expect(testAccount.getTransactionHistory()[0]).toEqual(testDeposit);
            expect(testAccount.getTransactionHistory()[1]).toEqual(testWithdrawal);
        });
    });
    describe("printStatement tests", () => {
        it("should print the statement to the console", () => {
            // Arrange
            const testAccount = new Account();
            const testDeposit = new MockTransaction("01/01/2024", 100, 0);
            const logSpy = spyOn(console, "log");

            // Act
            testAccount.depositFunds(testDeposit);
            testAccount.getStatementFromJSON();

            // Assert
            expect(logSpy).toHaveBeenCalledWith("date       || credit   || debit    || balance");
            expect(logSpy).toHaveBeenCalledWith("01/01/2024 || " +  "\x1b[32m" + "100.00" + "\x1b[0m" + "   ||          || "+ "\x1b[32m" + "100.00" + "\x1b[0m");
        });
        it("should print balance as red when negative", () => {
            // Arrange
            const testAccount = new Account();
            testAccount.setOverdraft(100);
            const testWithdrawal = new MockTransaction("01/01/2024", 0, 100);
            const logSpy = spyOn(console, "log");

            // Act
            testAccount.withdrawFunds(testWithdrawal);
            testAccount.getStatementFromJSON();

            // Assert
            expect(logSpy).toHaveBeenCalledWith("date       || credit   || debit    || balance");
            expect(logSpy).toHaveBeenCalledWith("01/01/2024 ||          || " + "\x1b[31m" + "100.00" + "\x1b[0m" + "   || " + "\x1b[31m" + "-100.00" + "\x1b[0m");

        });
    });

    describe("overdraft tests", () => {
        it("should allow the user to set an overdraft limit", () => {
            // Arrange
            const testAccount = new Account();

            // Act
            testAccount.setOverdraft(100);

            // Assert
            expect(testAccount.getOverdraft()).toEqual(100);
        });
        it("should allow the user to withdraw funds into a negative balance up to the value of the overdraft", () => { 
            // Arrange
            const testAccount = new Account();
            const testWithdrawal = new MockTransaction("01/01/2024", 0, 100);
            testAccount.setOverdraft(100);

            // Act
            testAccount.withdrawFunds(testWithdrawal);

            // Assert
            expect(testAccount.getBalance()).toEqual(-100); 
        });

    });
});
