import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
const Order = () => {
    //data account
    const initValueAccount = {
        id: "", username: "", password: "", name: "",
        email: "", photo: "", roles: []
    }


    const [account, setAccount] = useState(initValueAccount);

    //GET ACCOUT TO LOCAL
    useEffect(() => {
        let json = localStorage.getItem("account")
        const initValue = {
            id: "", username: "", password: "", name: "",
            email: "", photo: "", roles: []
        }
        setAccount(
            json ? JSON.parse(json) : initValue
        )
    }, []);
//    console.log(account)


    // data order
    const formDataInitValueOrder = {
        address: "",
        telephone: "",
        accountId: "",
        listOrderDetail: []
    }
   
    const [cart, setCart] = useState([]);
    const [formOrder, setFormOrder] = useState(formDataInitValueOrder);
   

    // GET DATA CART
    useEffect(() => {
        let json = localStorage.getItem("cart")
        setCart(
            json ? JSON.parse(json) : []
        )
    }, []);
    


    //GET CART
    useEffect(() => {
        let listOrderDetailArr = [];

        cart.map(val => {
            return listOrderDetailArr.push(
                {
                    productId: val.id,
                    quantity: val.quantity,
                    price: val.price
                })

        })
       

        setFormOrder((oldState) => {
            return {
                ...oldState,
                listOrderDetail: listOrderDetailArr,
            }
        })
       

    }, [cart]);

 
    //GET ACCOUNT ID
    useEffect(()=>{
        setFormOrder((oldState)=>{
            return {
                ...oldState,
                 accountId: account.id
            }
        });
    },[account])



    
    //bat su kien khi input thay doi
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
       
        setFormOrder({
            ...formOrder, //kiem soat cac thanh phan
            [name]: value
        });


    }

   
    // CREATE
    const onCreateStudent = () => {
       
       
        console.log(formOrder!==null?"Have Value":"");
        const url = 'http://localhost:8080/rest/admin/order';
        axios({
            url: url,
            method: 'POST',
            data: formOrder,
        })
            .then((response) => {
                console.log("ORDER SUCCESS");
                localStorage.removeItem('cart');
                window.location.reload();
               
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
       
       
        onCreateStudent();
        // 
        clickAlertHandle();

    }

     // total
     const getTotalSum = () => {
        return cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
    }

    //ALERT
    const [open, setOpen] = useState(false);


    const clickAlertHandle = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

// console.log(formOrder)
    //IMG URL
    const imgURL = `http://localhost:8080/rest/file/images`;

    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return (
        <div>
            <div className="col-12 row">
                <div className="col-8 offset-2">
                    <table className="table table-bordered table-hover border border-dark p-2 mt-2 ">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Count</th>
                                <th scope="col">Price</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((row, idx) => {

                                    return (
                                        <tr key={idx}>
                                            <td>{row.id}</td>
                                            <td>{row.name}</td>
                                            <td>
                                                <img src={`${imgURL}/${row.image}`} alt="bug"
                                                    style={{ width: '100px', height: '60px' }} />
                                            </td>
                                            <td>
                                                {row.quantity}
                                            </td>
                                            <td>{row.price}</td>
                                            <td>{date}</td>
                                            <td>{row.quantity*row.price}</td>
                                        </tr>
                                    );
                                })


                            }

                        </tbody>
                    </table>

                <div className="mt-5">
                    <h6>Tổng Giá Tiền : <b>{getTotalSum()}</b></h6>
                </div>

                </div>
            </div>
            {/* Form Order */}
            <div className="col-12 row">
                <div className="col-8 offset-2">
                    <form onSubmit={onSubmitHandler}>

                        <TextField fullWidth label="Telephone"
                            value={formOrder.telephone} name="telephone" onChange={onChangeHandler} />

                        <TextField fullWidth label="address" value={formOrder.address}
                            name="address" onChange={onChangeHandler} />
                        <div className="mt-3">
                            <button type="submit" className="btn btn-success">Purcharse</button>
                               
                        </div>

                    </form>
                </div>
            </div>

            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }} open={open} autoHideDuration={9000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="success" variant="filled" >
                    Đặt hàng thành công !
                </Alert>
            </Snackbar>

        </div>
    )
}
export default Order;