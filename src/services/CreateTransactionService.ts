import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total)
      throw Error('Valor de retirada maior que o total na conta')
    const transation = this.transactionsRepository.create({ title, value, type });
    return transation;
  }
}

export default CreateTransactionService;
