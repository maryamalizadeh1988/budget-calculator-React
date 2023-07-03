import React from 'react'
import { BsSend } from 'react-icons/bs'

function ExpenseForm({ item, amount, handleSubmit, handleItem, handleAmount, edit }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-between w-75 m-auto text-left'>
                <div className='form-group'>
                    <label>Item :</label>
                    <input type='text' name='item' className='form-control' placeholder='Enter item...' value={item} onChange={handleItem} />
                </div>
                <div className='form-group'>
                    <label>Amount :</label>
                    <input type='number' name='amount' className='form-control' placeholder='Enter Amount $' value={amount} onChange={handleAmount} />
                </div>
            </div>
            <button className='btn btn-success px-4' type='submit'>
                {edit ? "Edit" : "Send"}
                <BsSend className='ml-3' />
            </button>
        </form>
    )
}

export default ExpenseForm