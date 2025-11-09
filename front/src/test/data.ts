import {
  IIcomeExpenseData,
  ICategoryData,
  IProgressData,
} from "../dashboard/types/types";

export const icomesEspensesdata: IIcomeExpenseData[] = [
  { name: "Ene", incomes: 4000, expenses: 2400 },
  { name: "Feb", incomes: 3000, expenses: 1398 },
  { name: "Mar", incomes: 2000, expenses: 9800 },
  { name: "Abr", incomes: 2780, expenses: 3908 },
  { name: "May", incomes: 1890, expenses: 4800 },
  { name: "Jun", incomes: 2390, expenses: 3800 },
  { name: "Jul", incomes: 3490, expenses: 4300 },
];

export const expensesByCategoryData: ICategoryData[] = [
  { category: "Comida", amount: 4500 },
  { category: "Transporte", amount: 2300 },
  { category: "Entretenimiento", amount: 1800 },
  { category: "Servicios", amount: 3200 },
  { category: "Salud", amount: 1500 },
  { category: "Otros", amount: 900 },
];

export const debtsAndGoalsData: ICategoryData[] = [
  { category: "Deudas", amount: 17000 },
  { category: "Metas", amount: 53000 },
];

export const goalsProgressData: IProgressData[] = [
  { text: "Vacaciones", current: 3500, target: 8000 },
  { text: "Fondo de Emergencia", current: 12000, target: 15000 },
  { text: "Fondo de Emergencia", current: 12000, target: 15000 },
  { text: "Fondo de Emergencia", current: 12000, target: 15000 },
  { text: "Fondo de Emergencia", current: 12000, target: 15000 },
  { text: "Casa Propia", current: 8500, target: 30000 },
  { text: "Casa Propia", current: 8500, target: 30000 },
  { text: "Casa Propia", current: 8500, target: 30000 },
  { text: "Casa Propia", current: 8500, target: 30000 },
  { text: "Casa Propia", current: 8500, target: 30000 },
];

export const debtsProgressData: IProgressData[] = [
  { text: "Tarjeta de Crédito", current: 2000, target: 5000 },
  { text: "Préstamo Auto", current: 7500, target: 12000 },
];
