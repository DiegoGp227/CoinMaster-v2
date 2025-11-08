import LineCharts from "@/src/graphs/LineCharts";
import BarCharts from "@/src/graphs/BarCharts";
import Graphic from "../molecules/Graphic";
import {
  icomesEspensesdata,
  expensesByCategoryData,
  debtsAndGoalsData,
} from "@/src/test/data";

export default function GraphicOrganism() {
  return (
    <>
      <Graphic title="Income and Expenses">
        <LineCharts data={icomesEspensesdata} />
      </Graphic>
      <Graphic title="Expenses by Category">
        <BarCharts data={expensesByCategoryData} />
      </Graphic>
      <Graphic title="Debts and Goals">
        <BarCharts data={debtsAndGoalsData} />
      </Graphic>
    </>
  );
}
