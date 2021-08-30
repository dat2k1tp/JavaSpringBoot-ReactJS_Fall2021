import {useState,useEffect} from 'react';
import axios from 'axios';
import CreateUser from './CreateUser';
import ListUser from './ListUser';
import TaskSearch from './TaskSearch';
const User=()=>{

    const formDataInitValue={
        id:"",
        username: "",
        password: "",
        name: "",
        email:"",
        photo : "cloud-upload.jpg",
        // roles:[
        //     {
        //         id:""
        //     }
           
        // ]
    }
   
    const[clicked,setClicked]=useState(-1);
    const[formData,setFormData]=useState(formDataInitValue);
    const[listData,setListData]=useState([]);
    const[keyword,setKeyWord]=useState('');
    const[listFilter,setListFilter]=useState([]);
    const [page, setPage] = useState(0);
    const limit=3;


    useEffect(()=>{
        const url='http://localhost:8080/rest/admin/user?limit='+limit+"&page="+page;
        axios({
            url: url,
            method:'GET',
        })
            .then((response)=>{
                const{data}=response;
                setListData(data);
            })
            .catch((error)=>{
                console.log(error,error.response);
            });
    },[page]);

    //PHAN TRANG
    const trangTruoc = function () {
        if (page === 0) {
            return 1;
        }
        setPage(page - 1);
    }
    const trangSau = function () {
        setPage(page + 1);
    }

     //SEARCH
   useEffect(()=>{
    setListFilter(
        listData.filter((obj)=>{
            return obj.name.toLowerCase().includes(keyword.toLowerCase());
        })
    );
    },[keyword,listData]);


    //SORT
   const[sortValue,setSortValue]=useState('no');
   const onSortHandle=(event)=>{
       const{value}=event.target;
       setSortValue(value);
    
       if(value==='asc'){
           setListFilter(listData.sort((a,b)=>a.name.localeCompare(b.name)));
       }
       if(value==='desc'){
           setListFilter(listData.sort((a,b)=>b.name.localeCompare(a.name)));
       }
       

   }

   return(
    <div className="col-12 row">
        <h2 className="text-center">List User</h2>
        <div className="col-4">
            <div>
                <CreateUser clicked={clicked} 
                setClicked={setClicked}
                formData={formData}
                setFormData={setFormData}
                listData={listData}
                setListData={setListData}/>
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
                        
                        <select   name="sort" value={sortValue}
                            onChange={(event)=>onSortHandle(event)}
                            className="form-select" aria-label="Default select example">
                            <option value="no">---Sort By Name--</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>

                    </div>
                </div>
        
            </div>

            <div className="mt-3">
                <ListUser
                setFormData={setFormData}
                setClicked={setClicked}
                listFilter={listFilter}
                listData={listData}
                setListData={setListData}/>
            </div>
        </div> 

        <div style={{marginTop:"15px"}}>
            <ul className="pagination justify-content-center">
               <li className="page-item" onClick={trangTruoc}>
                    <button className="page-link">Trang trước</button>
                </li>
                <li className="page-item">
                     <button className="page-link">{page+1}</button>
                </li>
                <li className="page-item" onClick={trangSau}>
                    <button className="page-link">Trang sau</button>
                </li>
            </ul>

        </div>
       

            
   

             
    </div>

)


}
export default User;