class Transaction{
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

export default Transaction;