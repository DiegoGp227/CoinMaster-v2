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

      <div className="flex justify-center my-4">
        <div className="w-[84%] h-[400px] bg-black justify-center rounded-[5px] p-5 border-2 hover:border-soft-gray hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all duration-500 group">
          <div className="flex justify-center mb-4">
            <p className="text-soft-gray text-2xl group-hover:text-white transition-all duration-500 group">
              {"title"}
            </p>
          </div>
          <div className="w-full h-[300px]">{"children"}</div>
        </div>
      </div>

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
