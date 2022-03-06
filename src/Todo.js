import React from 'react';
import { useState, useEffect } from 'react';

const getLocalStorage = () => {
  let todoList = localStorage.getItem('todoList');
  if (todoList) {
    return (todoList = JSON.parse(localStorage.getItem('todoList')));
  } else {
    return [];
  }
};
const alertContent = {
  messege: '',
  type: '',
};

const Todo = () => {
  const [alert, setAlert] = useState(alertContent);
  const [itemValue, setItemValue] = useState('');
  const [itemID, setItemID] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [todo, setTodo] = useState(getLocalStorage);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (itemValue) {
      if (isEditing && itemValue) {
        setTodo(
          todo.map((item) => {
            if (item.id === itemID) {
              return { ...item, value: itemValue };
            }
            return item;
          })
        );
        displayAlert('Task Edited', 'success');
        setItemValue('');
        setItemID(null);
        setIsEditing(false);
      } else {
        const todoItem = {
          id: new Date().getTime().toString(),
          value: itemValue,
          isComplete: false,
        };
        displayAlert('Task Added', 'success');
        const TodoList = [todoItem, ...todo];
        setTodo(TodoList);
        setItemValue('');
      }
    }
  };
  const displayAlert = (messege, type) => {
    setShowAlert(true);
    setAlert({
      messege,
      type,
    });
  };

  const deleteItem = (id) => {
    const todoList = todo.filter((item) => item.id !== id);
    setTodo(todoList);
    displayAlert('Task Deleted', 'danger');
    setItemValue('');
    setIsEditing(false);
  };

  const editItem = (id) => {
    const specificItem = todo.find((item) => item.id === id);
    displayAlert('Editing...', 'warning');
    setIsEditing(true);
    setItemID(id);
    setItemValue(specificItem.value);
  };

  const completeItem = (id) => {
    setItemValue('');
    setIsEditing(false);
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          if (!item.isComplete) {
            displayAlert('Task Completed', 'success');
          }
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      })
    );
  };

  const removeAll = () => {
    setTodo([]);
    displayAlert('All items removed', 'danger');
  };

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todo));
    if (alert.messege !== 'Editing...') {
      let timeOut = setTimeout(() => {
        setShowAlert(false);
      }, 1500);
      return () => clearTimeout(timeOut);
    }
  }, [alert.messege, todo]);

  return (
    <div className='section-center'>
      <h2 className='title'>React assistant</h2>
      <div className='alert-container'>
        {showAlert && (
          <div className={`alert-box ${alert.type}`}>
            <p>{alert.messege}</p>
          </div>
        )}
      </div>
      <section className='main-container'>
        <h2>Task List</h2>
        <form onSubmit={handleSubmit} className='form-container'>
          <input
            onChange={(e) => setItemValue(e.target.value)}
            type='text'
            value={itemValue}
            className='input-control'
            placeholder='Type something...'
            maxLength={25}
          />
        </form>

        <div className='todo-list'>
          <ul className='todo-container'>
            {todo.map((item) => {
              return (
                <li
                  className={
                    item.isComplete === true ? 'isComplete item' : 'item'
                  }
                  key={item.id}
                >
                  <p className='item-value'>{item.value}</p>
                  <div className='btns-container'>
                    <button
                      onClick={() => editItem(item.id)}
                      className='btn edit'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                      >
                        <path d='M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z' />
                      </svg>
                    </button>
                    <button
                      onClick={() => completeItem(item.id)}
                      className='btn  complete'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                      >
                        <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className='btn delete'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {todo.length > 0 && (
          <button className='remove-items' onClick={removeAll}>
            remove all
          </button>
        )}
      </section>
    </div>
  );
};

export default Todo;
