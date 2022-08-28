import {useForm} from "react-hook-form"

function ToDoList() {
    const {register,watch, handleSubmit, formState} = useForm();

    const onValid = (data:any) => {
        console.log(data);
    }

    console.log(formState.errors);

    return (
        <div>
            <form
            style ={{display:"flex",flexDirection:"column"}} 
            onSubmit={handleSubmit(onValid)}
            >
                <input {...register("email",{ required : true })} placeholder = "Email" />
                {/* HTML 속성에 의지하는게 아니라, 자바스크립트를 사용해서 validation을 실행하고 있다. */}
                <input {...register("firstName",{ required : true })} placeholder = "First Name" />
                <input {...register("lastName",{ required : true })} placeholder = "Last Name" />
                <input {...register("userName",{ required : true, minLength:10 })} placeholder= "User" />
                {/* minLength속성은 onSubmit 함수의 if조건식을 대체한다. */}
                <input {...register("password",{ required : true, minLength:5 })} placeholder = "Password" />
                <input {...register("password1",{ required : "Password is required", minLength:{
                    value : 5,
                    message : "Your password is too short."
                } })} placeholder = "Password1" />
                <button>Add</button>
            </form>
        </div>
    )
}

export default ToDoList;