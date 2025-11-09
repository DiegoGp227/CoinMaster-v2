export interface IIcomeExpenseData {
  name: string;
  incomes: number;
  expenses: number;
}

export interface ICategoryData {
  category: string;
  amount: number;
}

export interface IProgressData {
  text: string;
  current: number;
  target: number;
}
