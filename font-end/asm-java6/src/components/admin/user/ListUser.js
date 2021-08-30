import axios from "axios";
const ListUser=({setClicked,setFormData,listFilter,setListData,listData})=>{
     
    //CLICK SHOW FORM
    const onClickHandler=(val,idx)=>{
        // setFormData(val);
        setClicked(idx);
        
    }
 
    //DELETE
    const btnDeleteOnClick=(index)=>{
        const confirm=window.confirm("Bạn muốn xóa nguời dùng này không ?");
        if(confirm===true){
            onDelete(index);
            // window.location.reload();
            window.alert("Đã chuyển vào thùng rác !")
            // console.log(listData);
        }
        
    }
    

    const onDelete=(index)=>{
      
        const url='http://localhost:8080/rest/admin/user/soft-delete/'+listFilter[index].id+"?deleteAt=1";
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

    const imgURL=`http://localhost:8080/rest/file/images`; 

    return(
        // className="col-12 row mt-5"
        <div >
		    
                <table className="table table-bordered table-hover border border-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Username</th>
                            <th scope="col">Name</th>
                             <th scope="col">Email</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listFilter.map((val,idx)=>{
                                return(
                                    <tr onClick={()=>onClickHandler(val,idx)} key={idx}>
                                        <td>{val.id}</td>
                                        <td>{val.username}</td>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>
                                            <img  src={`${imgURL}/${val.photo}`} alt="bug"
                                            style={{width:'100px', height:'60px'}}/>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                            onClick={()=>btnDeleteOnClick(idx)}>Delete</button>
                                        </td>
                                    </tr> 
                                );
                            })


                        }
                        
                    </tbody>
                </table>
           

        </div>
    );
}
export default ListUser;