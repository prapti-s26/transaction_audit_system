import React, { useState } from "react";
import API from "../api";

const Transfer = ({ refresh }) => {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      await API.post("/api/transfer", {
        receiverId: Number(receiverId),
        amount: Number(amount),
      });

      alert("Transfer successful");
      setReceiverId("");
      setAmount("");
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Transfer failed");
    }
  };

  return (
    <div className="card">
      <h2>Transfer Money</h2>
      <input placeholder="Receiver ID" value={receiverId} onChange={e=>setReceiverId(e.target.value)} />
      <br /><br />
      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <br /><br />
      <button onClick={handleTransfer}>Send</button>
    </div>
  );
};

export default Transfer;
