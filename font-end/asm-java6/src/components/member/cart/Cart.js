import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Cart = () => {


    const [cart, setCart] = useState([]);


    useEffect(() => {
        let json = localStorage.getItem("cart")
        setCart(
            json ? JSON.parse(json) : []
        )
    }, [])

    //remove
    const removeCart = (productRemove, index) => {
        setCart(
            cart.filter(product => product !== productRemove[index])
        )
        saveToLocalStorage(cart.filter(product => product !== productRemove[index]));
    }

    // total
    const getTotalSum = () => {
        return cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
    }


    //clear
    const btnClearCart = () => {
        setCart([]);
        // saveToLocalStorage([]);
        localStorage.removeItem("cart")
    }

    //onchange
    //gan value tim dc de setCart
    //amount=e.target.value
    const setQuantity = (product, amount, idx) => {
        const newCart = [...cart];

        newCart.find(
            (item) =>
                product[idx].name === item.name
        ).quantity = amount;

        setCart(newCart)
        saveToLocalStorage(newCart);
    }



    //  SAVE LOCAL
    const saveToLocalStorage = (product) => {
        let json = JSON.stringify(product)
        localStorage.setItem("cart", json);
    }

    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    //IMG URL
    const imgURL = `http://localhost:8080/rest/file/images`;
    return (
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
                            <th scope="col">Action</th>
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
                                            <input value={row.quantity}
                                                type="number"
                                                min="1" max="50"
                                                onChange={(e) => {
                                                    setQuantity(
                                                        cart,
                                                        e.target.value, idx
                                                    )
                                                }} />
                                        </td>
                                        <td>{row.price}</td>
                                        <td>{date}</td>
                                        <td>
                                            <button className="btn btn-outline-danger"
                                                onClick={() => removeCart(cart, idx)}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })


                        }
 
                    </tbody>
                </table>

                <div className="mt-5">
                    <h6>Tổng Giá Tiền : <b>{getTotalSum()}</b></h6>
                </div>
                <div style={{ marginTop: "15px" }}>
                    <button className="btn btn-danger" onClick={btnClearCart}>Clear Cart</button>
                    {cart.length > 0 ? <Link className="btn btn-success ms-1" to="/user/check-out">Order</Link> : ""}
                </div>


            </div>
        </div>
    )
}
export default Cart;