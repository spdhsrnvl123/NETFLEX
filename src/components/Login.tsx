import styled from "styled-components";
import {useForm} from "react-hook-form"

const Container = styled.div`
    height: 100vh;
`;

const Content = styled.div`
    background-image: url("img/LoginBackground.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    /* width: 80%; */
    margin: 0 auto;
    height:100vh;
    /* border-radius: 500px; */
    box-shadow: 0px 2px 7px 6px;
`;

// const Title = styled.h1`
//     font-size:67px;
//     color: yellow;
//     text-align: center;
//     padding-top: 30px;
//     /* text-shadow: 7px -4px 1px black; */
// `

const Log = styled.h1`
    color:rgb(255,255,255);
    font-size:45px;
    margin-top: 50px;
    margin-left: 67px;
`;

const Form = styled.div`
    background-color: rgba(0,0,0,0.9);
    position: absolute;
    top:50%;
    left:50%;
    width: 400px;
    height: 600px;
    transform: translate(-50%,-50%);
    box-shadow: 0px 0px 10px 7px rgba(0,0,0,0.3);
`;

const Button = styled.button`
    width:270px;
    height: 40px;
    margin-top: 30px;
    color:white;
    background-color: #ff3838;
    font-size: 18px;
    border-radius: 5px;
    box-shadow: 1px .5px 1px black;
    cursor: pointer;
    border:0;
    font-weight: bold;
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
            <img src="/img/N.png" alt="img" style={{width:"255px",position:"absolute",top:"-20px",left:"0px"}} />
            <Content>
                {/* <Title>Welcome!!</Title> */}
                <Form onSubmit={handleSubmit(onValid)}>
                <Log>Login</Log>
                <form style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
                    <input 
                    style={{width:"270px",height:"40px",fontSize:"16px",backgroundColor:"#2C3A47",border:"0",padding:"10px"}}
                    {...register("username",{
                        required:"Username is required",
                        pattern : {
                            value : /^[A-Za-z0-9._$+-]+@naver.com$/,
                            message : "Only naver.com emails allowed"
                        }
                    })}
                    placeholder = "Email address or Phone number"
                    />
                    <span style={{height:"30px",paddingTop:"8px",color:"gray"}}>{errors.username?.message}</span>
                    <input
                    type ="password"
                    style={{width:"270px",height:"40px",fontSize:"16px",backgroundColor:"#2C3A47",border:"0",padding:"10px"}}
                    {...register("password",{
                        required:"write here"
                    })}
                    placeholder = "Password"
                    />
                    <span style={{height:"10px",paddingTop:"8px",color:"gray"}}>{errors.password?.message}</span>
                    <Button>LogIn</Button>
                </form>
                    <br />
                    <label style={{marginLeft:"60px",color:"gray"}}><input type="checkbox"/>Save login information</label>
                    <p>Need help?</p>
                <p>log in with facebook</p>
                <p>Not a NetStats member?</p><span>Sign up now</span>
                <p>This page is protected by Google reCAPTCHA to confirm that you are not a robot.</p><span>자세히 알아보기</span>
                </Form>
            </Content>
        </Container>
    )
}

export default Login;