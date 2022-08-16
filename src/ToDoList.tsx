import { watch } from "fs";
import React, { useState } from "react"
import {useForm} from "react-hook-form"

// function ToDoList(){
//     const [toDo,setToDo] = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>)=> {
//         // const value = event.currentTarget.value;
//         const {
//             currentTarget : {value}
//         } = event;
//         setToDoError("")
//         setToDo(value)
//     }
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
//         event.preventDefault(); //새로고침 방지
//         if(toDo.length < 10){
//             return setToDoError("To be should be longer");
//         }
//         console.log("submit")
//     }

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value = {toDo} placeholder = "Write a to do" />
//                 <button>Add</button>
//                 {toDoError !== "" ? toDoError : null}
//             </form>
//         </div>
//     )
// }

//register 함수를 사용하면 onChange 이벤트 핸들러가 필요없다. -> onChange 객체를 가지고 있다.
//watch는 form의 입력값들의 변화를 관찰 할 수 있게 해주는 함수이다.

interface IForm{
    email:string;
    firstName:string;
    lastName:string;
    username:string;
    password:string;
    password1:string;
    extraError:string;
}

// setError는  특정한 에러를 발생시키게 해준다.
function ToDoList() {
    const { register , handleSubmit,formState:{errors},setError,setValue} = useForm<IForm>({
        defaultValues : {
            email : "@naver.com"
        }
    });
    // console.log(register("toDo"))
    const onValid = (data:IForm)=>{
        if(data.password !== data.password1){
            setError("password1",{message:"Password are not the same"},{shouldFocus:true})
            setValue("email","") //이메일을 제출하면 이메일 칸이 비워진다.
        }
        // setError("extraError",{ message:"Server offline." })
    }

    //setError는 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 도와준다.
    console.log(errors);
    // console.log(register("toDo"))
    // console.log(watch())
    return (
        <div>
            <form style={{ display:"flex",flexDirection:"column" }} onSubmit={handleSubmit(onValid)}>
            {/* 
            hadleSubmit은 두개의 인자를 받는다. 
            ->첫번째 onValid 함수는 form의 데이터가 유효할 때만 호출되는 함수이다. 필수 옵션
            ->두번째(onInvalid)는 필수는 아니다.
            */}
            {/* React-hook-form에서 문자열을 리턴하면, 에러 메시지를 리턴한다는 뜻이다. */}
                <input {...register("email",{
                    required:'Email is required',
                    pattern:{
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message : "Only naver.com emails allowed",
                }})} placeholder="Email" />
                <span>
                    {errors?.email?.message}
                </span>
                <input {...register("firstName",{
                    required:"write here",
                    validate:{
                        noNico :(value) => value.includes("nico") ? "no nicos allowed" : true,
                        noNick : (value) => value.includes("nick") ? "no nicos allowed" : true,
                    }
                    })} placeholder="First Name" />
                <span>
                    {errors?.firstName?.message}
                </span>
                <input {...register("lastName",{
                    required:"write here"
                    })} placeholder="Last Name" />
                <span>
                    {errors?.lastName?.message}
                </span>
                <input {...register("username",{
                    required:"write here",
                    minLength:{
                        value:10,
                        message : "Your username is too short"
                    }
                    })} placeholder="Username" />
                <span>
                    {errors?.username?.message}
                </span>
                <input {...register("password",{
                    required:"write here",
                    minLength:{
                        value:5,
                        message : "Your password is too short."
                    }
                    })} placeholder="Password" />
                <span>
                    {errors?.password?.message}
                </span>
                <input {...register("password1",{
                    required:"Password is required",
                    minLength:{
                    value : 5,
                    message : "Your password is too short."
                }})} placeholder="Password1" />
                <span>
                    {errors?.password1?.message}
                </span>
                <button>Add</button>
                <span>
                    {errors?.extraError?.message}
                </span>
            </form>
        </div>
    )
}

export default ToDoList;