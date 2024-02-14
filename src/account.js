import fs from "fs";
import Transaction from "./transaction.js";

class Account{
    #balance = 0;
    #transactionHistory = [];
    #overdraft = 0;

    depositFunds(transaction){
        this.#balance += transaction.getCredit();
        this.pushTransaction(transaction);
    }

    withdrawFunds(transaction){
        if (transaction.getDebit() > this.getBalance() + this.getOverdraft()){
            return console.log(`Insufficient funds to withdraw ${transaction.getDebit()}`);
        }
        this.#balance -= transaction.getDebit();
        this.pushTransaction(transaction);
    }

    // pushTransaction adds the transaction to the transactionHistory array and then writes the array to a JSON file in the data folder

    pushTransaction(transaction){
        transaction.setBalance(this.#balance);
        this.#transactionHistory.push(transaction);
        const transactionsToStore = [];
        this.getTransactionHistory().forEach((transaction) => {
            let tempTransaction = {
                ...transaction.getDetails()
            };
            transactionsToStore.push(tempTransaction);
        });
        if (!fs.existsSync(`./data`)) {
            fs.mkdirSync(`./data`, { recursive: true });
        }
        fs.writeFileSync(`./data/account.json`, JSON.stringify(transactionsToStore));
    }

    getBalance(){
        return this.#balance;
    }
    getTransactionHistory(){
        return this.#transactionHistory;
    }

    // getStatementFromJSON reads the JSON file and calls the createJSONTransaction method a new transaction for each entry in the file. It then calls the printStatementFromJSON method

    getStatementFromJSON(){
        const transactionHistoryFromJSON = [];
        const cardListRawData = JSON.parse(fs.readFileSync(`./data/account.json`));
        cardListRawData.forEach((transaction) => {
            transactionHistoryFromJSON.push(this.createJSONTransaction(transaction));
        });
        this.printStatementFromJSON(transactionHistoryFromJSON);
    }

    createJSONTransaction(transaction){
        let tempTransaction;
        if (!transaction.credit){
            tempTransaction = new Transaction(transaction.date, 0, transaction.debit);
        }
        else {
            tempTransaction = new Transaction(transaction.date, transaction.credit, 0);
        }
        tempTransaction.setBalance(transaction.balance);
        return tempTransaction;
    }

    // printStatementFromJSON prints the statement to the console, ensuring that each value is correctly formatted and coloured

    printStatementFromJSON(transactionHistoryFromJSON){
        console.log("date       || credit   || debit    || balance");
        transactionHistoryFromJSON.reverse().forEach(transaction => {
            if (!transaction.getCredit()) {
                console.log(transaction.getDate() + " || ".padEnd(13) +     "|| " + this.colourNegative(this.makeDecimal(transaction.getDebit())).padEnd(17) + " || " + this.setBalanceColour(this.makeDecimal(transaction.getBalance())))
            }
            else{
                console.log(transaction.getDate() + " || " + this.colourPositive(this.makeDecimal(transaction.getCredit())).padEnd(17) + " || ".padEnd(12) + " || " + this.setBalanceColour(this.makeDecimal(transaction.getBalance())))
            }
        });
    }

    makeDecimal(number){
        return Number(number).toFixed(2);
    }

    colourPositive(number){
        return "\x1b[32m" + number + "\x1b[0m";
    }

    colourNegative(number){
        return "\x1b[31m" + number + "\x1b[0m";
    }

    setBalanceColour(number){
        if(number < 0){
            return this.colourNegative(number);
        }
        return this.colourPositive(number);
    }

    setOverdraft(overdraft){
        this.#overdraft = overdraft;
    }

    getOverdraft(){
        return this.#overdraft;
    }

}

export default Account;