import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TrasationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0
    };
    balance = this.transactions.reduce((balance: Balance, transaction: Transaction) => {
      if (transaction.type === "income")
        balance.income += transaction.value;
      else
        balance.outcome += transaction.value;
      balance.total = balance.income - balance.outcome;
      return balance;
    }, balance);

    return balance;

  }

  public create(data: TrasationDTO): Transaction {
    const transation = new Transaction(data);
    this.transactions.push(transation);
    return transation;
  }
}

export default TransactionsRepository;
