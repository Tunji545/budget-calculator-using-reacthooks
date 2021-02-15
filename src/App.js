import React, {useState} from "react";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import './App.css';


function App() {

  
  const initialExpenses = [
    {
      id: 1,
      charge: "rent",
      amount: 1600
    },
    {
      id: 2,
      charge: "car payment",
      amount: 400 
    },
    {
      id: 1,
      charge: "credit card bill",
      amount: 1200
    }
  ]
  
  const [expenses, setExpenses] = useState(initialExpenses);

  return (
    <>
      <Alert />
      <h1>Bydget Calculator</h1>
      <main className="App">
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>total budget: {" "} 
        <span className="total">
          ${expenses.reduce((acc, curr) => {return acc += curr.amount}, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
