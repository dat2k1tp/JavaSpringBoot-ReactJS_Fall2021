import React from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import HomeAdmin from './components/admin/HomeAdmin';
import HomeUser from './components/member/HomeUser';
import Login from './components/auth/Login';
import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom';




function App() {
  const formDataInitValue = {
    id: "",
    username: "",
    password: "",
    name: "",
    email: "",
    photo: "",
    roles: [

    ]
  }
  const [account, setAccount] = useState(formDataInitValue);
  const [isLogin, setIsLogin] = useState(false);

  //GET DATA TO LOCAL
  useEffect(() => {
    let json = localStorage.getItem("account")
    const initValue = {
      id: "",
      username: "",
      password: "",
      name: "",
      email: "",
      photo: "",
      roles: []
    }
    setAccount(
      json ? JSON.parse(json) : initValue
    )
  }, [isLogin])
  console.log(isLogin+":STATUS LOGIN");

  return (

    <div>


      <BrowserRouter>
        <Switch>
          <Route path="/">
            {
              
              account.roles.length === 0 ? <Login isLogin={isLogin} setIsLogin={setIsLogin} />
                :
                account.roles.map((val, idx) => {
                  console.log(val)
                  if (val === "ADMIN" || val === "STAFF") {
                    return <HomeAdmin key={idx}
                      isLogin={isLogin}
                      setIsLogin={setIsLogin} />
                  } else {
                    return <HomeUser key={idx}
                      isLogin={isLogin}
                      setIsLogin={setIsLogin} />
                  }
                })
            }
          </Route>
          
        </Switch>

      </BrowserRouter>
    </div>




  );
}

export default App;
