import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TaskSearch from "./TaskSearch";
const ViewOrder = ({check}) => {
    const [listData, setListData] = useState([]);
    const [keyword, setKeyWord] = useState('');
    const [listFilter, setListFilter] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const limit = 5;



    //LOAD ORDER DETAIL
    useEffect(() => {
       
            const url = 'http://localhost:8080/rest/admin/order' 
                 +'?page=' + page + '&limit=' + limit;

            axios({
                url: url,
                method: 'GET',
            })
                .then((response) => {
                    const { data } = response;
                    setListData(data.content);
                    setTotalPage(data.totalPages);
                    // setStatus(data.content.status);
                })
                .catch((error) => {
                    console.log(error, error.response);
                });

       

    }, [page,check]);


    //ACTION SOFT-DELETE
    const btnDelete=(index)=>{
        const confirm=window.confirm("Bạn muốn xóa đơn hàng này không ?");
        if(confirm===true){
            onDelete(index);
            // window.location.reload();
            window.alert("Đã chuyển vào thùng rác !")

        }
        
    }

    //SOFT-DELETE
    const onDelete=(index)=>{
     
        const url='http://localhost:8080/rest/admin/order/soft-delete/'
        +listFilter[index].id+"?deletedAt=1";
        console.log(url)
        axios({
            url:url,
            method:'PUT'
        })
            .then((response)=>{
                if(response.status===200){
                    setListData((oldState)=>{
                        return oldState.filter((val,idx)=>{
                            return idx===index?false:true;
                        });
                    });
                  
                }
            })
            .catch((error)=>{
                console.log(error);
            });
    }


   

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
                return obj.account.name.toLowerCase().includes(keyword.toLowerCase());
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
        localStorage.setItem("statusOrder",status);
        // console.log(orderId + " orderId")
    }

   


    return (
        <div className="col-12 row">
            <div className="col-10 offset-1">
                {/* content */}
                <h2 className="text-center">List Order</h2>
               <TaskSearch keyword={keyword} setKeyWord={setKeyWord}/>

                <div style={{ marginBottom: '10px' }}>

                    <div className="col-12 row mt-2">
                        <div className="col-3 offset-3">

                            <select name="sort" value={sortValue}
                                onChange={(event) => onSortHandle(event)}
                                className="form-select" aria-label="Default select example">
                                <option value="no">--Sort By Date--</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>

                        </div>
                    </div>

                </div>

                <table className="table table-bordered table-hover border border-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Purchase Date</th>
                            <th scope="col">Address</th>
                            <th scope="col">Telephone</th>
                            <th scope="col">Status</th>
                            <th scope="col-2">Action</th>
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
                                           
                                            <Link className="btn btn-primary btn-sm" 
                                            to="/admin/order-detail">View Order Details</Link>
                                            <button onClick={()=>btnDelete(idx)} 
                                            className="btn btn-danger ms-1">
                                            Delete</button>
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