import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Login = ({isLogin,setIsLogin}) => {

    const [formLogin, setFormLogin] = useState({
        username: "",
        password: ""
    })





    const onChangeHandler = (event) => {
        const { value, name } = event.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        })


    }

    //  SAVE LOCALSTOARAGE
    const saveToLocalStorage = (data) => {
         
        let json = JSON.stringify(data)
        localStorage.setItem("account", json);
    }

    //LOGIN
    const onLogin = () => {

        const url = 'http://localhost:8080/rest/admin/user/login?username=' + formLogin.username
            + "&password=" + formLogin.password;
        axios({
            url: url,
            method: 'GET',
        })
            .then((response) => {
                const { data } = response;
               if(data.id!==null){
                saveToLocalStorage(data);
                setIsLogin(true);
                console.log("LOGIN SUCCESS");
               }
                
            })
            .catch((error) => {
                console.log(error, error.response);
            });
    }

    //SUBMIT FORM
    const onSubmitHandler = (event) => {
        event.preventDefault();

        //CREATE
        onLogin();
    }

    return (

        <div className="col-12 row" style={{
            backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/Others/images/76.jpg")'
            , height: '100vh'
        }}>
            <div className="col-6 offset-3">

                <form onSubmit={onSubmitHandler}>
                    <div className="mt-3">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={formLogin.username}
                            onChange={onChangeHandler} id="username" className="form-control" />
                    </div>

                    <div className="mt-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={formLogin.password}
                            onChange={onChangeHandler} id="password" className="form-control" />
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-secondary">Login</button>
                    </div>


                    <Link style={{
                        fontFamily: 'courier,arial,helvetica',
                        textDecoration: 'none', float: 'right', color: 'white'
                    }}
                        className="fst-italic fs-5"
                        to="/register"><b>Register</b></Link>


                </form>

            </div>
        </div>



    )
}
export default Login;