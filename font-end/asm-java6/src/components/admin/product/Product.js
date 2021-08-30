import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProduct from './CreateProduct';
import ListProduct from './ListProduct';
import TaskSearch from './TaskSearch';
const Product=()=>{
    const formDataInitValue = {
        id: "",
        available: "",
        name: "",
        image:"cloud-upload.jpg",
        price: ""
    }

    const [clicked, setClicked] = useState(-1);
    const [formData, setFormData] = useState(formDataInitValue);
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

    //LOAD PRODUCT 
    useEffect(() => {
        const url = 'http://localhost:8080/rest/admin/product?limit=' + limit 
        + "&page=" + page+"&categoryId="+categoryId;
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


    //PHAN TRANG
    const trangTruoc = function () {
        if(totalPage===0){
            return 1;
        }
        else if (page === 0) {
            setPage(totalPage-1);
        }else{
            setPage(page - 1);
        }
       
    }
    const trangSau = function () {
        
        if(page>=totalPage-1){
            setPage(0);
        }else{
            setPage(page + 1);
        }
       
    }
    const trangDau = ()=> {
        setPage(0);
    }

    const trangCuoi =  ()=> {
        
        if(totalPage>0){
            setPage(totalPage-1);
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
     

     return (
        <div className="col-12 row">
             <h3 className="text-center">List Product</h3>

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

            <div className="col-4">
                <div>
                    <CreateProduct clicked={clicked}
                        setClicked={setClicked}
                        formData={formData}
                        setFormData={setFormData}
                        listData={listData}
                        setListData={setListData} 
                        categoryId={categoryId}/>
                </div>
            </div>

            <div className="col-8 border border-dark border-2 rounded">

                <div>
                    <TaskSearch keyword={keyword}
                        setKeyWord={setKeyWord} />

                </div>

                <div>

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

                <div className="mt-3">
                    <ListProduct
                        setFormData={setFormData}
                        setClicked={setClicked}
                        listFilter={listFilter}
                        listData={listData}
                        setListData={setListData} />
                </div>
            </div>

            <div style={{ marginTop: "15px" }}>
                <ul className="pagination justify-content-center">
                    <li className="page-item" onClick={trangDau}>
                        <button className="page-link">First</button>
                    </li>
                    <li className="page-item" onClick={trangTruoc}>
                        <button className="page-link">Previous</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link">{totalPage>0?page+1:page}/{totalPage}</button>
                    </li>
                    <li className="page-item" onClick={trangSau}>
                        <button className="page-link">Next</button>
                    </li>
                    <li className="page-item" onClick={trangCuoi}>
                        <button className="page-link">Last</button>
                    </li>
                </ul>

            </div>






        </div>
    );


}
export default Product;