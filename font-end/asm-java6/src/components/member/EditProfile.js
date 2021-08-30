import { useState,useEffect } from "react";
import axios from 'axios';
const EditProfile = ({setIsLogin}) => {
    //Form edit profile
    const [formData, setFormData] = useState({
        id:'',
        username: '',
        password: '',
        name: '',
        email: '',
        photo: 'l60Hf.png'
    });


      //data account
      const initValueAccount = {
        id: "", username: "", password: "", name: "",
        email: "", photo: "", roles: []
    }

    //GET ACCOUT TO LOCAL
    const [account, setAccount] = useState(initValueAccount);
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

    
    //SET ACCOUNT TO FORMDATA
    useEffect(()=>{
        setFormData((oldState)=>{
            return {
                ...oldState,
                 id: account.id,username: account.username, password: account.password
                , name: account.name, email: account.email, photo: account.photo
       
            }
        });
    },[account])

    //
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
   

    //UPDATE
    const onUpdateStudent = () => {
        
        const url = 'http://localhost:8080/rest/admin/user/'+formData.id;
        axios({
            url: url,
            method: 'PUT',
            data: formData,
        })
            .then((response) => {
                localStorage.removeItem('account');
                setIsLogin(false);
                //window.location.reload();
                console.log("UPDATE SUCCESS");
            })
            .catch((error) => {
                console.log(error.response);
            })
    }


    //UPLOAD FILE
    const upLoadFile=(event)=>{
        const{files}=event.target;
        // console.log(files)
        var form=new FormData();
       
            form.append("file",files[0]);
 
        axios({
            url:"http://localhost:8080/rest/file/images",
            method:'POST',
            headers:{'Content-Type':undefined},
            data:form,
        })
            .then((response)=>{
               
                setFormData({
                    ...formData,
                    photo:response.data
                });
              
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    //SUBMIT FORM
    const onSubmitHandler = (event) => {
        event.preventDefault();
       let confirm=window.confirm("Cập nhật thông tin sẽ thoát khỏi phiên đăng nhập !")
            //UPDATE
            if(confirm===true){
                onUpdateStudent(); 
                window.alert('Cập nhật thành công')
               
                
            }
           
        
    }
    
    //IMG URL
     const imgURL=`http://localhost:8080/rest/file/images`; 

    return (
       
            <div className="col-12 row mt-5">
                <div className="col-6 offset-3">

                    <h2>Edit Profile</h2>
                    <form onSubmit={onSubmitHandler}>

                       
                        <div className="form-group mt-3">
                            <label htmlFor="name">Name</label>
                            <input name="name" className="form-control" 
                                value={formData.name}
                                id="name" autoComplete="off" onChange={onChangeHandler} />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="email">Email</label>
                            <input name="email" className="form-control" 
                                value={formData.email}
                                id="email" autoComplete="off" onChange={onChangeHandler} />
                        </div>


                        <div className="form-group mt-3">
                            
                            <label htmlFor="photo">
                                <img  src={`${imgURL}/${formData.photo}`} alt="bug"
                                style={{width:'10rem', height:'6rem'}}/>
                            </label><br/>
                            <input   name="photo" id="upload-files" 
                            type="file" accept="image/*" 
                             onChange={(event)=>upLoadFile(event)} />
                        </div>

                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                       
                    </form>
                    

                    
                </div>
            </div>
       
    );
}
export default EditProfile;