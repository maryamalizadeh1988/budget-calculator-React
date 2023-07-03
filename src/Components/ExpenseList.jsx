import React from 'react'
import ExpenseItem from './ExpenseItem'
import { BsTrash } from 'react-icons/bs'

function ExpenseList({ expenses, handleRemove, removeAll, handleEdit }) {
    return (
        <>
            <ul className='p-0 mt-5'>
                {expenses.map((item) =>
                    <ExpenseItem key={item.id} id={item.id} itemEx={item.itemEx} amount={item.amount}
                        handleRemove={handleRemove} handleEdit={handleEdit} />
                )}
            </ul>
            {expenses.length > 0 &&
                <button className='btn btn-outline-danger my-4' onClick={removeAll}>
                    Clear List
                    <BsTrash className='ml-3' />
                </button>}
        </>
    )
}

export default ExpenseList