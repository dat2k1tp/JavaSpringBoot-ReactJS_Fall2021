import {
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Footer from '../layout/Footer';
import NavUs from '../layout/NavUs';
import ViewProduct from './product/ViewProduct';
import ProductDetail from './product/ProductDetail';
import Cart from './cart/Cart'
import Order from './order/Order'
import { useState } from 'react';
import ViewOrder from './order/ViewOrder';
import ViewOrderDetail from './order/ViewOrderDetail';
import EditProfile from './EditProfile';
import ChangePassword from '../auth/ChangePassword';
const HomeUser =({isLogin, setIsLogin})=>{
    
    const[check,setCheck]=useState(false);
   
    return(
        <div>
        <BrowserRouter>

            <NavUs isLogin={isLogin} 
            setIsLogin={setIsLogin}/>
                
                <Typography component="div" >
                    <Switch>
                        {/* HOME PRODUCT*/}
                        <Route path="/home">
                            <ViewProduct />
                        </Route>
                        <Route path="/view-product">
                            <ProductDetail/>
                        </Route>

                        {/* BOOKING PRODUCT */}
                       
                        <Route path="/user/cart">
                            <Cart></Cart>
                        </Route>
                        <Route path="/user/check-out">
                            <Order isLogin={isLogin} 
                             setIsLogin={setIsLogin}></Order>
                        </Route>

                        {/* ORDER */}
                        <Route path="/user/order">
                            <ViewOrder check={check} setCheck={setCheck} />
                        </Route>
                        <Route path="/user/order-detail">
                            <ViewOrderDetail check={check} setCheck={setCheck} />
                        </Route>

                        {/* USER */}
                        <Route path="/user/edit-profile">
                            <EditProfile isLogin={isLogin} 
                            setIsLogin={setIsLogin}/>
                        </Route>
                        <Route path="/user/change-password">
                            <ChangePassword isLogin={isLogin} 
                            setIsLogin={setIsLogin}/>
                        </Route>
                    </Switch>
                </Typography>

            <Footer/>

        </BrowserRouter>

        </div>
    )
}
export default HomeUser;