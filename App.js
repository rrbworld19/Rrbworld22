
import React, { useState } from 'react';
import jsPDF from 'jspdf';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('purchase');
  const [party, setParty] = useState('');
  const [paymentType, setPaymentType] = useState('cash');

  const addTransaction = () => {
    const newTransaction = {
      id: Date.now(),
      item,
      price: parseFloat(price),
      type,
      party,
      paymentType,
      date: new Date().toLocaleString(),
    };
    setTransactions([...transactions, newTransaction]);
    setItem('');
    setPrice('');
    setParty('');
  };

  const generateReceipt = (txn) => {
    const doc = new jsPDF();
    doc.text('RRB WORLD - Sales Receipt', 10, 10);
    doc.text(`Party: ${txn.party}`, 10, 20);
    doc.text(`Item: ${txn.item}`, 10, 30);
    doc.text(`Price: ₹${txn.price}`, 10, 40);
    doc.text(`Payment Type: ${txn.paymentType}`, 10, 50);
    doc.text(`Date: ${txn.date}`, 10, 60);
    doc.save(`receipt_${txn.id}.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>RRB WORLD - Business Manager</h2>
      <input placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Party" value={party} onChange={(e) => setParty(e.target.value)} />
      <select onChange={(e) => setType(e.target.value)}>
        <option value="purchase">Purchase</option>
        <option value="sale">Sale</option>
      </select>
      <select onChange={(e) => setPaymentType(e.target.value)}>
        <option value="cash">Cash</option>
        <option value="credit">Credit</option>
      </select>
      <button onClick={addTransaction}>Add</button>

      <h3>Transactions</h3>
      <ul>
        {transactions.map(txn => (
          <li key={txn.id}>
            {txn.item} - ₹{txn.price} ({txn.type}) - {txn.party} [{txn.paymentType}]
            <button onClick={() => generateReceipt(txn)}>Download Receipt</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
