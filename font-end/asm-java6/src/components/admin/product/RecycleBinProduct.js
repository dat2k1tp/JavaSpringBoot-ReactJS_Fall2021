import { useState, useEffect } from 'react';
import axios from 'axios';
const RecycleBinProduct = () => {
    const [listData, setListData] = useState([]);
    const [keyword, setKeyWord] = useState('');
    const [listFilter, setListFilter] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listCate, setListCate] = useState([]);
    const [categoryId, setCategoryId] = useState(1);
    const limit = 3;

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
        const url = 'http://localhost:8080/rest/admin/product/recycle-bin?limit=' + limit 
        + "&page=" + page+"&categoryId="+categoryId;
        console.log(url)
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
    }, [page,categoryId]);


    //RESTORE
    const btnRestoreOnClick = (index) => {
        const confirm = window.confirm("Bạn muốn khôi phục sản phẩm này không ?");
        if (confirm === true) {
            onRestore(index);
            // window.location.reload();

        }

    }


    const onRestore = (index) => {

        const url = 'http://localhost:8080/rest/admin/product/soft-delete/'
            + listFilter[index].id + "?deletedAt=0";
        console.log(url)
        axios({
            url: url,
            method: 'PUT'
        })
            .then((response) => {
                if (response.status === 200) {
                    setListData((oldState) => {
                        return oldState.filter((val, idx) => {
                            return idx === index ? false : true;
                        });
                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }//END RESTORE



    //DELETE
    const btnDeleteOnClick = (index) => {
        const confirm = window.confirm("Bạn muốn xóa vĩnh viễn sản phẩm này không ?");
        if (confirm === true) {
            onDelete(index);
            // window.location.reload();

        }

    }


    const onDelete = (index) => {

        const url = 'http://localhost:8080/rest/admin/product/'
            + listFilter[index].id;
        console.log(url)
        axios({
            url: url,
            method: 'DELETE'
        })
            .then((response) => {
                if (response.status === 200) {
                    setListData((oldState) => {
                        return oldState.filter((val, idx) => {
                            return idx === index ? false : true;
                        });
                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }//END DELETE

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
     const categoryIdOnChange=(event)=>{
        const{value}=event.target;
        setCategoryId(value);
        setPage(0);
    }

    const imgURL=`http://localhost:8080/rest/file/images`;
    return (
        // 
        <div className="col-12 row">
             <h3 className="text-center">Recycle Bin Product</h3>

            {/* CATEGORYID */}
             <div style={{ marginBottom: '10px',marginTop:'5px'}} className="col-6 offset-3">
                <label>Danh Mục</label>
                <select className="form-select"
                 name="categoryId" aria-label="Default select example" onChange={categoryIdOnChange}>
                    {
                        listCate.map( (val, idx)=>{
                            return (
                                <option key={idx} value={val.id} >{val.name}</option>
                            );
                        })
                    }
                </select>
            </div>

            <div className="col-8 offset-2">
                {/* content */}

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
                        <div className="col-4 offset-3">

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

                <table className="table table-bordered table-hover border border-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Available</th>
                            <th scope="col">Price</th>
                            <th scope="col">CreateDate</th>
                            <th scope="col-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listFilter.map((val, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>
                                            <img  src={`${imgURL}/${val.image}`} alt="bug"
                                            style={{width:'100px', height:'60px'}}/>
                                        </td>
                                        <td>{val.available}</td>
                                        <td>{val.price}</td>
                                        <td>{val.createDate.substring(0,10)}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                onClick={() => btnRestoreOnClick(idx)}>Restore</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => btnDeleteOnClick(idx)}>Delete</button>
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
    );

}
export default RecycleBinProduct;