import Account from '../src/account.js'
import Transaction from '../src/transaction.js';



console.log("Create a new Account")
const testAccount = new Account();

console.log("Create a new Transaction where 1000 is deposited")
const testTransaction = new Transaction("10/01/2012", 1000, 0);

console.log("Deposit the funds into the account")
testAccount.depositFunds(testTransaction);

// console.log("Print the statement")
// testAccount.getStatementFromJSON();

console.log("Create a new Transaction where 2000 is deposited")
const testTransaction1 = new Transaction("13/01/2012", 2000, 0);

console.log("Deposit the funds into the account")
testAccount.depositFunds(testTransaction1);

console.log("Create a new Transaction where 500 is withdrawn")
const testTransaction2 = new Transaction("14/01/2012", 0, 500);

console.log("Withdraw the funds from the account")
testAccount.withdrawFunds(testTransaction2);

console.log("Set overdraft limit to 100")
testAccount.setOverdraft(100);

// console.log("Create a new Transaction where 100 is withdrawn")
// const testTransaction3 = new Transaction("03/01/2024", 0, 100);

// console.log("Withdraw funds from the account")
// testAccount.withdrawFunds(testTransaction3);

testAccount.getStatementFromJSON();


