import { useState,useEffect } from 'react';
import '../component/FormInput.css';
import TodoList from './TodoList';
import db from '../utils/firebase'

const FormInput = () =>{
   
    const [input,setInput] = useState('');
    const [todos,setTodos] = useState([]);
    
    useEffect(()=>{
        db.collection('todos').onSnapshot(snapshot => (
            setTodos(snapshot.docs.map(todo => todo))
        ))
    },[])
    const handleSubmit = (e) =>{
        
        e.preventDefault();
        if(input.trim()){
            db.collection('todos').add({
                text: input
            })
            
            setInput('')
        }

    }
    return (
        <div className="form-C">
            <h1>Todo List React</h1>
            <form action="">
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
            <button onClick={handleSubmit}type="submit">AddTodo</button>
            </form>
            {
               todos.map(todo => ( <TodoList key={todo.id} id={todo.id} active={todo.data().active} text={todo.data().text} />)) 
            }
        </div>
    )
}

export default FormInput;