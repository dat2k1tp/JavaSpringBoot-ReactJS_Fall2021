import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const ViewProduct = () => {
    const [listData, setListData] = useState([]);
    const [keyword, setKeyWord] = useState('');
    const [listFilter, setListFilter] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listCate, setListCate] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const limit = 4;

    //LOAD CATEGORY
    useEffect(() => {
        const url = 'http://localhost:8080/rest/admin/category/all';
        axios({
            url: url,
            method: 'GET',
        })
            .then((response) => {
                const { data } = response;
                setListCate(data);
            })
            .catch((error) => {
                console.log(error, error.response);
            });
    }, []);


    //DATA PRODUCT
    useEffect(() => {
        let url;
        if (categoryId === "") {
            url = 'http://localhost:8080/rest/admin/product/all?limit=' + limit
                + "&page=" + page;
        } else {
            url = 'http://localhost:8080/rest/admin/product?limit=' + limit
                + "&page=" + page + "&categoryId=" + categoryId;
        }

        // console.log(url)
        axios({
            url: url,
            method: 'GET',
        })
            .then((response) => {
                const { data } = response;

                setListData(data.content);
                setTotalPage(data.totalPages);



            })
            .catch((error) => {
                console.log(error, error.response);
            });
    }, [page, categoryId]);


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
                return obj.name.toLowerCase().includes(keyword.toLowerCase());
            })
        );
    }, [keyword, listData]);


    //SORT
    const [sortValue, setSortValue] = useState('no');
    const onSortHandle = (event) => {
        const { value } = event.target;
        setSortValue(value);

        if (value === 'asc') {
            setListFilter(listData.sort((a, b) => a.name.localeCompare(b.name)));
        }
        if (value === 'desc') {
            setListFilter(listData.sort((a, b) => b.name.localeCompare(a.name)));
        }
    }

    //DANH MUC ID
    const categoryIdOnChange = (event) => {
        const { value } = event.target;
        setCategoryId(value);
        setPage(0);
    }

    //IMAGE URL
    const imgURL = `http://localhost:8080/rest/file/images`;

    //SET CATEGORY ID
    const onClickHandler=(val,idx)=>{
       let id=val.id+""
       localStorage.setItem("productId",id);
        
    }


   
    
    return (
        <div style={{ minHeight: '100rem' }}>

            {/* CATEGORYID */}
            <div style={{ marginBottom: '10px', marginTop: '10px' }} className="col-6 offset-3">
                <label>Danh Mục</label>
                <select className="form-select"
                    name="categoryId" aria-label="Default select example" onChange={categoryIdOnChange}>
                    <option value="">ALL</option>
                    {
                        listCate.map((val, idx) => {
                            return (
                                <option key={idx} value={val.id} >{val.name}</option>
                            );
                        })
                    }
                </select>
            </div>

            <div className="col-8 offset-2">
                {/* content */}
                    {/* TASK SEARCH */}
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

                    {/* TASK SORT */}
                <div style={{ marginBottom: '10px' }}>

                    <div className="col-12 row mt-2">
                        <div className="col-3 offset-3">

                            <select name="sort" value={sortValue}
                                onChange={(event) => onSortHandle(event)}
                                className="form-select" aria-label="Default select example">
                                <option value="no">---Sort By Name--</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>

                        </div>
                    </div>

                </div>



                <div className="mt-2 col-10 offset-1 p-2" >


                    {
                        // 
                        listFilter.map((val, idx) => {
                            return (
                                <div className="card-group text-center" style={{
                                    width: '18rem', float: 'left',
                                    height: '17rem', margin: '50px', position: 'relative'
                                }} key={idx}  onClick={()=>onClickHandler(val,idx)}>
                                    <div className="card border border-dark">

                                        <Link className="card-block clearfix" to="/view-product">
                                            <img src={`${imgURL}/${val.image}`}
                                                className="card-img-top" alt="bug" width="250" height="200" />
                                            <div className="card-body">
                                                <h5 className="card-title text-uppercase"><i>Name</i>: {val.name}</h5>
                                                <p className="card-text"><b>Price</b>: {val.price}</p>
                                                <button className="btn btn-primary">View</button>
                                                
                                            </div>
                                        </Link>
                                        

                                    </div>
                                </div>
                            );
                        })


                    }
                </div>

            </div>

            {/* Paginate */}
            <div style={{ marginTop: "800px" }} >
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
    );
}
export default ViewProduct;