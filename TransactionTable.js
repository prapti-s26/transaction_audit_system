import React, { useState } from "react";

const TransactionTable = ({ data }) => {
  const [sortAsc, setSortAsc] = useState(true);

  const sortedData = [...data].sort((a, b) =>
    sortAsc ? Number(a.amount) - Number(b.amount)
            : Number(b.amount) - Number(a.amount)
  );

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Sender</th>
          <th>Receiver</th>
          <th onClick={() => setSortAsc(!sortAsc)} style={{ cursor: "pointer" }}>
            Amount 
          </th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((t) => (
          <tr key={t.id}>
            <td>{t.sender_id}</td>
            <td>{t.receiver_id}</td>
            <td>{t.amount}</td>
            <td>{new Date(t.timestamp).toLocaleString()}</td>
            <td>{t.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
