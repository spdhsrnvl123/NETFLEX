import React from "react"
import { useSetRecoilState } from "recoil"
import { IToDo, toDoState } from "../atoms"

/*
newCategory:"TO_DO | "DOING" \ "DONE"을 써줄 수 있지만 썻던 걸 다시 사용하고 싶지 않으니 아래와 같은 방법 사용
newCategory:IToDo["category"]
*/


function ToDo({text,category,id}:IToDo){
    const setToDos = useSetRecoilState(toDoState)
    // 인자를 받는 onClick 함수
    // const onClick = (newCategory:IToDo["category"])=>{
    //     console.log("i wanna to",newCategory)
    // }
    const onClick = (event : React.MouseEvent<HTMLButtonElement>)=>{
        const name = event.currentTarget.name;
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
            
            
            console.log(targetIndex)
            return oldToDos
        })
    }
    return <li>
        <span>{text}</span>
        {/*
         <button onClick={onClick}>Doing</button>
         이 방식이 일반적이지만 인자가 넘겨지지 않는다. 
         */}
        {/*  //인자를 넘겨주는 방식
        {category !== "DOING" && <button onClick={()=> onClick("DOING")}>Doing</button>}
        {category !== "TO_DO" && <button onClick={()=> onClick("TO_DO")}>To Do</button>}
        {category !== "DONE" && <button onClick={()=> onClick("DONE")}>Done</button>}
         */}
        {category !== "DOING" && (<button name="DOING" onClick={onClick} >Doing</button>)}
        {category !== "TO_DO" && (<button name="TO_DO" onClick={onClick} >To Do</button>)}
        {category !== "DONE" && (<button name="DONE" onClick={onClick} >Done</button>)}
        
        </li>
// ex) "DONE"이 아닐 때만, "Done"버튼을 보여줄 것이다.
}

export default ToDo;