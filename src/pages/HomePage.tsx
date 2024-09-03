import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [budgets, setBudgets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newBudget, setNewBudget] = useState({ name: '', amount: 0, currency: 'PHP' });

  const navigate = useNavigate();

  const handleCreateBudget = () => {
    setBudgets([...budgets, newBudget]);
    setShowPopup(false);
    navigate(`/budget/${budgets.length}`);
  };

  return (
    <div className="home-page">
      <h1>Travel Budget Tracker</h1>
      <button onClick={() => setShowPopup(true)}>Create Travel Budget</button>

      {showPopup && (
        <div className="popup">
          <input
            type="text"
            placeholder="Budget Name"
            value={newBudget.name}
            onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Budget Amount (PHP)"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) })}
          />
          <select
            value={newBudget.currency}
            onChange={(e) => setNewBudget({ ...newBudget, currency: e.target.value })}
          >
            <option value="PHP">PHP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <button onClick={handleCreateBudget}>Submit</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}

      <ul>
        {budgets.map((budget, index) => (
          <li key={index} onClick={() => navigate(`/budget/${index}`)}>
            {budget.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
