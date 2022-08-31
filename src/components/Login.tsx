import styled from "styled-components"
import {useForm} from "react-hook-form"

const Container = styled.div`
    height: 100vh;
    /* overflow: hidden; */
`
const Content = styled.div`
    background-image: url("img/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    width: 80%;
    margin: 0 auto;
    height:100vh;
    border-radius: 500px;
    box-shadow: 0px 2px 7px 6px;
`
const Form = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    width: 500px;
    transform: translate(-50%,-50%);
`
const Button = styled.button`
    background-color: transparent;
    width: 250px;
    border-radius: 50px;
    /* border:0; */
    font-size:18px;
    height: 30px;
    cursor: pointer;
`
const ButtonII = styled(Button)`
background-color: transparent;
border: 0;
width: 110px;
border-radius: 50px;
/* border:0; */
height: 30px;
`

interface IForm{
    username : string;
    password : string;
}

const Login = ()=>{
    const {register,handleSubmit,formState:{errors}} = useForm<IForm>()

    const onValid = (data:IForm)=>{
        alert("Welcome!")
    }
    return (
        <Container>
            <Content>
                <Form onSubmit={handleSubmit(onValid)}>
                <h1 style={{textAlign:"center",fontSize:"90px",marginBottom:"20px",color:"black"}}>Welcome!</h1> 
                <form style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"20px"}}>
                    <label style={{padding:"10px"}}>
                    Username : <input 
                    style={{width:"230px",height:"30px",fontSize:"18px"}}
                    {...register("username",{
                        required:"Username is required",
                        pattern : {
                            value : /^[A-Za-z0-9._$+-]+@naver.com$/,
                            message : "Only naver.com emails allowed"
                        }
                    })}
                    placeholder = "Email"
                    />
                    </label>
                    <span style={{marginBottom:"10px",color:"red"}}>{errors.username?.message}</span>
                    <label style={{paddingBottom:"20px"}}>
                    Password : <input
                    type ="password"
                    style={{width:"230px",height:"30px",fontSize:"18px"}} 
                    {...register("password",{
                        required:"write here"
                    })}
                    placeholder = "Password"
                    />
                    </label>
                    <span style={{marginTop:"-11px",marginBottom:"10px",color:"red"}}>{errors.password?.message}</span>
                    <Button>LOG IN</Button>
                </form>
                <div style={{display:"flex" ,justifyContent:"center"}}>
                    <ButtonII>find ID</ButtonII>
                    <ButtonII>Forgot your password</ButtonII>
                </div>
                <h1 style={{textAlign:"center",padding:"25px"}}>Sign Up</h1>
                </Form>
            </Content>
        </Container>
    )
}

export default Login;