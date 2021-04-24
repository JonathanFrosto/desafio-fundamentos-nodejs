import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionDTO: TransactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (
      transactionDTO.type === 'outcome' &&
      transactionDTO.value > balance.total
    ) {
      throw Error("You don't have enough balance");
    }

    return this.transactionsRepository.create(transactionDTO);
  }
}

export default CreateTransactionService;
