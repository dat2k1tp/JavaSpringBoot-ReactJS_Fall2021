import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
const ViewOrder = ({check}) => {
    const [listData, setListData] = useState([]);
    const [keyword, setKeyWord] = useState('');
    const [listFilter, setListFilter] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [accountId, setAccountId] = useState("");
    const limit = 5;


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

    //GET ACCOUNT ID
    useEffect(() => {
        setAccountId(account.id);
    }, [account])


    //LOAD ORDER DETAIL
    useEffect(() => {
        if (accountId !== "") {
            const url = 'http://localhost:8080/rest/admin/order/account/' + accountId +
                '?page=' + page + '&limit=' + limit;

            axios({
                url: url,
                method: 'GET',
            })
                .then((response) => {
                    const { data } = response;
                    setListData(data.content);
                    setTotalPage(data.totalPages)
                })
                .catch((error) => {
                    console.log(error, error.response);
                });

        }

    }, [page, accountId,check]);


    //PHAN TRANG
    const trangTruoc = function () {
        if (totalPage === 0) {
            return 1;
        }
        else if (page === 0) {
            setPage(totalPage - 1);
        } else {
            setPage(page - 1);
        }

    }
    const trangSau = function () {

        if (page >= totalPage - 1) {
            setPage(0);
        } else {
            setPage(page + 1);
        }

    }

    const trangDau = () => {
        setPage(0);
    }

    const trangCuoi = () => {
        if (totalPage > 0) {
            setPage(totalPage - 1);
        }

    }

    //SEARCH
    useEffect(() => {
        setListFilter(
            listData.filter((obj) => {
                return obj.createDate.toLowerCase().includes(keyword.toLowerCase());
            })
        );
    }, [keyword, listData]);


    //SORT
    const [sortValue, setSortValue] = useState('no');
    const onSortHandle = (event) => {
        const { value } = event.target;
        setSortValue(value);

        if (value === 'asc') {
            setListFilter(listData.sort((a, b) => a.createDate.localeCompare(b.createDate)));
        }
        if (value === 'desc') {
            setListFilter(listData.sort((a, b) => b.createDate.localeCompare(a.createDate)));
        }
    }


    const OnClickHandler = (orderId,status) => {
        localStorage.setItem("orderId", orderId);
        localStorage.setItem('statusOrder',status);
        // console.log(orderId + " orderId")
    }


    return (
        <div className="col-12 row">
            <div className="col-8 offset-2">
                {/* content */}

                <div className="col-12 row mt-5">
                    <div className="col-6 offset-3">
                        <nav className="navbar navbar-light bg-light">

                            <div className="input-group">

                                <input
                                    className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Nhập ngày mua"
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
                                <option value="no">---Sort By Date--</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>

                        </div>
                    </div>

                </div>

                <table className="table table-bordered table-hover border border-dark text-center">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Purchase Date</th>
                            <th scope="col">Address</th>
                            <th scope="col">Telephone</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listFilter.map((val, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{val.id}</td>
                                        <td>{val.account.name}</td>
                                        <td>{val.createDate.substring(0, 10)}</td>
                                        <td>{val.address}</td>
                                        <td>{val.telephone}</td>
                                        <td>
                                            <select className="custom-select"
                                                value={val.status} disabled>
                                                <option value="0">Xác nhận đơn hàng</option>
                                                <option value="1">Chờ lấy hàng</option>
                                                <option value="2">Đang xử lý đơn hàng</option>
                                                <option value="3">Đang giao hàng</option>
                                                <option value="4">Giao hàng thành công</option>
                                                <option value="5">Hủy đơn hàng</option>
                                            </select>
                                        </td>

                                        <td  onClick={() => OnClickHandler(val.id,val.status)}>
                                           
                                                    <Link className="btn btn-info" 
                                                    to="/user/order-detail">View Order Details</Link>
                                        </td>
                                    </tr>
                                );
                            })


                        }

                    </tbody>
                </table>
            </div>

            {/* Paginate */}
            <div style={{ marginTop: "15px" }}>
                <ul className="pagination justify-content-center">
                    <li className="page-item" onClick={trangDau}>
                        <button className="page-link">First</button>
                    </li>
                    <li className="page-item" onClick={trangTruoc}>
                        <button className="page-link">Previous</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link">{totalPage > 0 ? page + 1 : page}/{totalPage}</button>
                    </li>
                    <li className="page-item" onClick={trangSau}>
                        <button className="page-link">Next</button>
                    </li>
                    <li className="page-item" onClick={trangCuoi}>
                        <button className="page-link">Last</button>
                    </li>
                </ul>
            </div>
            {/* end content */}

        </div>
    )
}
export default ViewOrder;