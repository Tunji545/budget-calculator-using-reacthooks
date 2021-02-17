import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { v4 as uuidv4 } from "uuid";
import './App.css';

// const initialExpenses = [
  //   {
  //     id: uuidv4(),
  //     charge: "rent",
  //     amount: 1600
  //   },
  //   {
  //     id: uuidv4(),
  //     charge: "car payment",
  //     amount: 400 
  //   },
  //   {
  //     id: uuidv4(),
  //     charge: "credit card bill",
  //     amount: 1200
  //   }
  // ]

  const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

function App() {
  
  // *************** state values ****************
  // expenses, all expense
  const [expenses, setExpense] = useState(initialExpenses);
  // charge
  const [ charge, setCharge ] = useState("");
  // amount
  const [ amount, setAmount ] = useState("");

  // alert
  const [ alert, setAlert ] = useState({show: false});

  // Edit
  const [edit, setEdit] = useState(false);

  // Edit Item
  const [id, setId] = useState(0);

  // *************** useEffect ***************
  useEffect(() => {
    console.log("useEffect is called");
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])
  
  // *************** functionality ***************
  // handle alert
  const handleCharge = e => {
    setCharge(e.target.value);
  }

  // handle amount
  const handleAmount = e => {
    setAmount(e.target.value);
  }

  // handle alert
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false})
    }, 3000)
  } 

  // clear all list
  const clearList = () => {
    setExpense([]);
    handleAlert({type: "danger", text: "all item cleared."})
  }

  // handle delete
  const handleDelete = id => {
    const tempExpense = expenses.filter(item => item.id !== id);
    setExpense(tempExpense);
    handleAlert({type: "danger", text: "item deleted."})
  }

  // handle edit
  const handleEdit = id => {
    const expense = expenses.find(item => { return item.id === id})
    const {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  // handle submit
  const handleSubmit = e => {
    e.preventDefault();      
    if(charge !== "" && amount > 0) {
      if(edit) {
        const editExpense = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpense(editExpense);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      }
      else {
        const singleExpense = {id: uuidv4(), charge, amount }
        setExpense([...expenses, singleExpense])
        handleAlert({type: "success", text: "item added."})
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({type: "danger", text: `Alert can't be empty and the amount must be greater than zero.`})
    }
  }
  return (
    <>
      {alert.show &&  <Alert type={alert.type} text={alert.text} /> }  
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit} />
        <ExpenseList expenses={expenses} clearList={clearList} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
      <h1>total budget: {" "} 
        <span className="total">
          ${expenses.reduce((acc, curr) => {return acc += parseInt(curr.amount)}, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
