import React, { useEffect, useState } from "react";
import API from "../api";
import TransactionTable from "../components/TransactionTable";

const History = ({ reload }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("/api/history")
      .then((res) => setTransactions(res.data))
      .catch(() => alert("Failed to load history"));
  }, [reload]);

  return (
    <div className="card">
      <h2>Transaction History</h2>
      <TransactionTable data={transactions} />
    </div>
  );
};

export default History;
