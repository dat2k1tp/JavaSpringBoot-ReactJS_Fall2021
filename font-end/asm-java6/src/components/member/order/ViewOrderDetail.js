import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import StepByStep from './StepByStep';
const ViewOrderDetail = ({check,setCheck}) => {
    const [listData, setListData] = useState([]);
    const [keyword, setKeyWord] = useState('');
    const [listFilter, setListFilter] = useState([]);

    //LOAD ORDER DETAIL
    useEffect(() => {
        let id = Number(localStorage.getItem("orderId"))
        // console.log(id);
        const url = 'http://localhost:8080/rest/admin/order-detail?orderId=' + id;
        axios({
            url: url,
            method: 'GET',
        })
            .then((response) => {
                const { data } = response;
                setListData(data);
            })
            .catch((error) => {
                console.log(error, error.response);
            });
    }, []);

    //SEARCH
    useEffect(() => {
        setListFilter(
            listData.filter((obj) => {
                return obj.product.name.toLowerCase().includes(keyword.toLowerCase());
            })
        );
    }, [keyword, listData]);


    //SORT
    const [sortValue, setSortValue] = useState('no');
    const onSortHandle = (event) => {
        const { value } = event.target;
        setSortValue(value);

        if (value === 'asc') {
            setListFilter(listData.sort((a, b) => a.product.name.localeCompare(b.product.name)));
        }
        if (value === 'desc') {
            setListFilter(listData.sort((a, b) => b.product.name.localeCompare(a.product.name)));
        }
    }

     // total
     const getTotalSum = () => {
        return listData.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
    }
 
    //orderID
    let orderId = Number(localStorage.getItem("orderId"))
    //IMAGE URL
    const imgURL = `http://localhost:8080/rest/file/images`;
    return (
        <div className="col-12 row" style={{minHeight:'70rem'}}>
            <div className="col-10 offset-1">
                {/* content */}
                <StepByStep check={check} setCheck={setCheck}/>
                <div className="col-12 row mt-5">
                    <div className="col-6 offset-3">
                        <nav className="navbar navbar-light bg-light">

                            <div className="input-group">

                                <input
                                    className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Nhập tên sản phẩm"
                                    aria-label="Search"
                                    name="keyword"
                                    value={keyword}
                                    onChange={(event) => setKeyWord(event.target.value)} />

                            </div>

                        </nav>
                    </div>
                </div>


                <div style={{ marginBottom: '10px' }}>
                    <div className="col-12 row mt-2">
                        <div className="col-3 offset-3">

                            <select name="sort" value={sortValue}
                                onChange={(event) => onSortHandle(event)}
                                className="form-select" aria-label="Default select example">
                                <option value="no">---Sort--</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>

                        </div>
                    </div>
                </div>


                <table className="table table-bordered table-hover border border-dark text-center">
                    <thead>
                        <tr>
                            <th colSpan="5" className="fs-5">Đơn hàng {orderId}</th>
                        </tr>
                        <tr>
                            <th scope="col">OrderDetailId</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listFilter.map((val, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{val.id}</td>
                                        <td>{val.product.name}</td>
                                        <td>{val.price}</td>
                                        <td>
                                            <img src={`${imgURL}/${val.product.image}`} alt="bug"
                                                style={{ width: '100px', height: '60px' }} />
                                        </td>
                                        <td>{val.quantity}</td>
                                       
                                    </tr>
                                );
                            })


                        }

                    </tbody>
                </table>

                <div className="mt-5">
                    <h6>Tổng Tiền Cần Thanh Toán : <b>{getTotalSum()}</b></h6>
                </div>

                <div className="mt-2">
                         
                        <Link className="btn btn-dark" 
                        to="/user/order">Go to Order
                        </Link>
                   
                </div>

 {/* end content */}
            </div>

       
       
           

        </div>
    );
}
export default ViewOrderDetail;