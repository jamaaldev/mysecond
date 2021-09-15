import "../component/TodoList.css";
import { HiX } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import db from ".././utils/firebase";

const TodoList = (props) => {
  // useEffect(() =>{
  //     if(props.active === true){

  //         document.querySelectorAll('span svg.check').forEach(item => {
  //         let activeCheck = item.parentElement.getAttribute('data-active')

  //         if(activeCheck){
  //             console.log("%c 🇳🇺: TodoList -> activeCheck ", "font-size:16px;background-color:#ad2cf7;color:white;", activeCheck)
  //              item.classList.add('activeCheck')
  //         }
  //         });
  //     }
  // },[props.active])

  const deleteMark = (e) => {
    db.collection("todos")
      .doc(props.id)
      .delete()
      .then(console.log("We Deleted SuccesFull"))
      .catch(console.log("Something is Wrong"));
  };

  const checkMark = (e) => {
      if(e.target.className.animVal === 'activeCheck'){
        console.log("kio",e.target.className.animVal);
        db.collection('todos').doc(props.id).update({ active: false}).then( (actives) =>{
        console.log("%c 🏪: checkMark -> actives ", "font-size:16px;background-color:#fdcd4d;color:black;", actives)

        });
        }
        
        if(e.target.className.animVal === 'check'){

            db.collection("todos").doc(props.id).update({ active: true });
        }
  };

  return (
    <div className="todo-C">
      <li className={props.active ? "linethrough" : ""}>{props.text}</li>
      <div>
        <span data-active={props.active} onClick={checkMark}>
          <HiCheck className={props.active ? "activeCheck" : "check"} />
        </span>
        <span onClick={deleteMark}>
          <HiX className="del" />
        </span>
      </div>
    </div>
  );
};

export default TodoList;

