import React from 'react';
import { useState, useEffect } from 'react';
import TodoItem from './Components/TodoItem';

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

    if (itemValue && itemValue.trim() !== '') {
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
    } else {
      displayAlert('Please Enter Task', 'danger');
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
    <div className='section-center section'>
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
                <TodoItem
                  item={item}
                  completeItem={completeItem}
                  deleteItem={deleteItem}
                  editItem={editItem}
                />
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
