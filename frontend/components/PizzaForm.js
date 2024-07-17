import React, { useState } from 'react'
import { useAddOrderMutation, useGetOrdersQuery } from '../state/pizzaApi'

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState)
  const [addOrder, { isLoading, error }] = useAddOrderMutation()
  const { refetch } = useGetOrdersQuery()
  const [showValidation, setShowValidation] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formState.fullName || !formState.size) {
      setShowValidation(true)
      return
    }
    setShowValidation(false)
    const toppings = ['1', '2', '3', '4', '5'].filter((topping) => formState[topping])
    const newOrder = { fullName: formState.fullName, size: formState.size, toppings }

    try {
      await addOrder(newOrder).unwrap()
      setFormState(initialFormState)
      refetch()
    } catch (err) {
      console.error('Failed to save the order: ', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>{`Order failed: ${error.data.message}`}</div>}
      {showValidation && !formState.fullName && <div className='failure'>Order failed: fullName is required</div>}
      {showValidation && !formState.size && <div className='failure'>Order failed: size must be one of the following values: S, M, L</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={formState.size} onChange={handleChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={formState['1']} onChange={handleChange} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={formState['2']} onChange={handleChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={formState['3']} onChange={handleChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={formState['4']} onChange={handleChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={formState['5']} onChange={handleChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
