import '../src/style.css';
import uuid from 'react-uuid';
import ExpenseForm from './Components/ExpenseForm';
import ExpenseList from './Components/ExpenseList';
import { useEffect, useState } from 'react';
import Alert from './Components/Alert';

function App() {
  const initialExpense = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

  const [expenses, setExpense] = useState(initialExpense);

  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }, [expenses])
  const handleItem = (e) => {
    setItem(e.target.value);
  }
  const handleAmount = (e) => {
    setAmount(e.target.value);
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({
        show: false
      })
    }, 2000)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item !== "" && amount > 0) {
      if (edit) {
        let expenseEdit = expenses.map(x => {
          return x.id === id ? { ...x, itemEx: item, amount } : x;
        });
        setExpense(expenseEdit);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited!" });

      } else {
        const expense = { id: uuid(), itemEx: item, amount };
        setExpense([...expenses, expense]);
        handleAlert({ type: "success", text: "OK!" })
      }
      setItem("");
      setAmount("");

    } else {
      handleAlert({ type: "danger", text: "Please enter Item and Amount!" });
    }
  }
  const handleRemove = (id) => {
    const list = expenses.filter((item) => item.id !== id);
    setExpense(list);
    setItem("");
    setAmount("");
    handleAlert({ type: "danger", text: "Deleted Item" });
  }
  const removeAll = () => {
    setExpense([]);
    setItem("");
    setAmount("");
    handleAlert({ type: "danger", text: "Deleted All items!" })
  }
  const handleEdit = (id) => {
    const singleEx = expenses.find(item => item.id === id);
    const { itemEx, amount } = singleEx;
    setItem(itemEx);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <div className="App">
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1 className='mb-4'>Budget Calculator</h1>
      <div className="main">
        <ExpenseForm item={item} amount={amount} handleItem={handleItem}
          handleAmount={handleAmount} handleSubmit={handleSubmit} handleEdit={handleEdit} edit={edit} />
        <ExpenseList expenses={expenses} handleRemove={handleRemove} removeAll={removeAll} handleEdit={handleEdit} />
      </div>
      <h2 className='mt-4'>Total Spending: $
        {
          expenses.reduce((a, b) => {
            return (a += parseInt(b.amount));
          }, 0)
        }</h2>
    </div>
  );
}

export default App;
