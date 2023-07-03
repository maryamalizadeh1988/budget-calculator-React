
import React from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs'

function ExpenseItem({ id, itemEx, amount, handleRemove, handleEdit }) {
    return (
        <>
            <li>
                <span>{itemEx}</span>
                <span>${amount}</span>
                <div>
                    <BsPencil className='text-success' onClick={() => handleEdit(id)} />
                    <BsTrash className='text-danger' onClick={() => handleRemove(id)} />
                </div>
            </li>
        </>
    )
}

export default ExpenseItem