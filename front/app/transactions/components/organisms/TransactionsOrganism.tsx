"use client";
import FilterDashboard from "@/app/components/molecules/FilterDashboard";
import { FilterOption } from "@/app/components/organisms/DashboardOrganism";
import { useState } from "react";
import Modal from "@/app/components/atoms/Modal";
import NewTranssactions from "../atoms/NewTransactions";
import TableDiv from "../molecules/TableDiv";

export default function TransactionsOrganism() {
  const [filterDate, setFilterDate] = useState<FilterOption>("Month");
  const [modalNewTransactions, setModalNewTransactions] =
    useState<boolean>(false);

  return (
    <>
      <FilterDashboard setFilterDate={setFilterDate} filterDate={filterDate} />
      <NewTranssactions
        setModalNewTransactions={() => setModalNewTransactions(true)}
      />
      <TableDiv title="History">
        <div></div>{" "}
      </TableDiv>


      {modalNewTransactions ? (
        <Modal onClose={() => setModalNewTransactions(false)}>
          <div>h2sdasda</div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
