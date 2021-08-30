import NavAd from "../layout/NavAd"
import Typography from '@material-ui/core/Typography';
import {
    Switch,
    Route,
    BrowserRouter
  } from 'react-router-dom';
  import User from '../admin/user/User';
  import RecycleBinUser from './user/RecycleBinUser';
import TaskRole from "./authorization/TaskRole";
import Category from '../admin/category/Category';
import RecycleBinCategory from '../admin/category/RecycleBinCategory';
import Product from '../admin/product/Product';
import RecycleBinProduct from '../admin/product/RecycleBinProduct';
import ViewOrder from "./order/ViewOrder";
import ViewOrderDetail from "./order/ViewOrderDetail";
import RecycleBinOrder from "./order/RecycleBinOrder";
import { useState } from "react";
const HomeAdmin=({isLogin, setIsLogin})=>{
  const[check,setCheck]=useState(0);
    return (
        <BrowserRouter>
           

            <div className="container-fluid" >
            
                <div className="row min-vh-100 flex-column flex-md-row">
                    <aside className="col-12 col-md-3 col-xl-2 p-0 bg-dark flex-shrink-1">
                        <NavAd isLogin={isLogin} 
                        setIsLogin={setIsLogin}></NavAd>
                    </aside>
                


                    <main className="col px-0 flex-grow-1">
                        <div className="container py-3">
                            <article>
                                <Typography component="div" style={{ backgroundColor: '#F8F8FF'}} >
                                    <Switch>
                                        {/* USER */}
                                        <Route path="/admin/user/list">
                                            <User></User>
                                        </Route>
                                        <Route path="/admin/user/recycle-bin">
                                            <RecycleBinUser></RecycleBinUser>
                                        </Route>
                                        <Route path="/admin/authorization">
                                            <TaskRole></TaskRole>
                                        </Route>

                                        {/* CATEGORY */}
                                        <Route path="/admin/category/list">
                                            <Category></Category>
                                        </Route>
                                        <Route path="/admin/category/recycle-bin">
                                            <RecycleBinCategory></RecycleBinCategory>
                                        </Route>

                                        {/* PRODUCT */}
                                        <Route path="/admin/product/list">
                                            <Product></Product>
                                        </Route>
                                        <Route path="/admin/product/recycle-bin">
                                            <RecycleBinProduct></RecycleBinProduct>
                                        </Route>

                                        {/* ORDER */}
                                        <Route path="/admin/order/list">
                                            <ViewOrder check={check} setCheck={setCheck}/>
                                        </Route>
                                        <Route path="/admin/order-detail">
                                            <ViewOrderDetail check={check} setCheck={setCheck}/>
                                        </Route>
                                        <Route path="/admin/order/recycle-bin">
                                           <RecycleBinOrder></RecycleBinOrder>
                                        </Route>
                                    </Switch>
                                </Typography>
                            </article>
                        </div>
                    </main>
            
                </div>

        
            </div>
    </BrowserRouter>   
       
    );
}
export  default HomeAdmin;