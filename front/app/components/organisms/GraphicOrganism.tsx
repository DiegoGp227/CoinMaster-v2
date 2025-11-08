import LineCharts from "@/src/graphs/LineCharts";
import Graphic from "../molecules/Graphic";
import { icomesEspensesdata } from "@/src/test/data";

export default function GraphicOrganism() {
  return (
    <>
      <Graphic title="Income and Expenses">
        <LineCharts data={icomesEspensesdata} />
      </Graphic>
      <Graphic title="Expenses by Category">
        {/* Aquí puedes agregar otro componente de gráfica */}
        <div></div>
      </Graphic>
      <Graphic title="Debts and Goals">
        {/* Aquí puedes agregar otro componente de gráfica */}
        <div></div>
      </Graphic>
    </>
  );
}
