import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    const income = this.transactions.reduce((total, current) => {
      return current.type === 'income' ? total + current.value : total;
    }, 0);

    const outcome = this.transactions.reduce((total, current) => {
      return current.type === 'outcome' ? total + current.value : total;
    }, 0);

    return { income, outcome, total: income - outcome };
  }

  public create(transactionDTO: TransactionDTO): Transaction {
    const transaction = new Transaction(transactionDTO);

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
