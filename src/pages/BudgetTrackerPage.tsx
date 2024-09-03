import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BudgetTrackerPage.css';

const BudgetTrackerPage = () => {
  const { id } = useParams();
  const [budget, setBudget] = useState({
    name: '',
    amount: 0,
    currency: 'PHP',
    expenses: [],
  });
  const [exchangeRate, setExchangeRate] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [newExpense, setNewExpense] = useState({ name: '', amount: 0 });

  // Example: Fetch exchange rate using axios (adjust API endpoint accordingly)
   React.useEffect(() => {
   axios.get(`https://v6.exchangerate-api.com/v6/bbf250a0b2d50fa1cea905e9/latest/${budget.currency}`)
    .then(response => setExchangeRate(response.data.conversion_rates.PHP))
    .catch(error => console.error('Error fetching exchange rate:', error));
}, [budget.currency]);


  const handleAddExpense = () => {
    const updatedExpenses = [...budget.expenses, newExpense];
    setBudget({ ...budget, expenses: updatedExpenses });
    setShowPopup(false);
  };

  return (
    <div className="budget-tracker-page">
      <h1>{budget.name}</h1>
      <h2>Total Budget: {budget.amount} {budget.currency}</h2>
      <ul>
        {budget.expenses.map((expense, index) => (
          <li key={index}>
            {expense.name} - {expense.amount} {budget.currency} 
            (PHP {expense.amount * exchangeRate})
          </li>
        ))}
      </ul>
      <h3>Remaining Budget: PHP {budget.amount * exchangeRate - budget.expenses.reduce((acc, exp) => acc + exp.amount * exchangeRate, 0)}</h3>
      
      <button onClick={() => setShowPopup(true)}>Add Expense</button>

      {showPopup && (
        <div className="popup">
          <input
            type="text"
            placeholder="Expense Name"
            value={newExpense.name}
            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Expense Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
          />
          <button onClick={handleAddExpense}>Submit</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BudgetTrackerPage;
