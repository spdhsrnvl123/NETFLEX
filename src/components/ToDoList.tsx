import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
/*
 setToDos 함수는 두개의 동작을 수행할 수 있다.
state를 직접적으로 설정해 줄 수도 있고 아니면 다른 함수를 받을 수 있다.
setTodDos함수에 함수를 쓴다면, 함수의 리턴값이 새로 운 state가 될 것이다. -> 현재 state에 접근 가능
 */
function ToDoList(){
    // const [x,setX] = useState()
    const toDos = useRecoilValue(toDoState);
    // const value = useRecoilValue(toDoState)
    // const modFn = useSetRecoilState(toDoState)
    // const { register, handleSubmit, setValue } = useForm<IForm>();
    console.log(toDos)
    return(
        <div>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />
            <ul>
                {toDos.map((toDo)=> (
                    // <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />
                    <ToDo key={toDo.id} {...toDo} />

                    /*
                    이렇게 사용해도 작동하는 이유는 , toDos 배열의 toDo 원소 하나하나가
                    ToDo컴포넌트에 필요한 props와 같은 모양이기 때문이다.
                    둘다 같은 타입이기 떄문
                    */
                    ))}
            </ul>
        </div>
    )
}

export default ToDoList;