import { useState,useEffect} from "react";
import axios from 'axios';
const ChangePassword=({setIsLogin})=>{
    const [formData,setFormData]=useState({
        id: "",
        password: "",
        newPassword:"",
        confirmPassword:""
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


     //GET ACCOUNT ID
     useEffect(()=>{
        setFormData((oldState)=>{
            return {
                ...oldState,
                 id: account.id
            }
        });
    },[account])

// Bat event khi thay doi form
    const onChangeHandler=(event)=>{
        const{name,value}=event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }


     //UPDATE
     const onChangePass = () => {
        
        const url = 'http://localhost:8080/rest/admin/user/change-password/'+formData.id;
        axios({
            url: url,
            method: 'PUT',
            data: formData,
        })
            .then((response) => {
                localStorage.removeItem('account');
                setIsLogin(false);
                //window.location.reload();
                console.log("CHANGE SUCCESS");

            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        let confirm=window.confirm("Cập nhật password sẽ thoát khỏi phiên đăng nhập !")
            //UPDATE
            if(confirm===true){
                onChangePass(); 
                window.alert('Cập nhật thành công')
                
            }
    }
    

   const onReset=(event)=>{
        event.preventDefault();
        setFormData({
            id:formData.id,
            password: "",
           newPassword:"", confirmPassword:""
        });
   }
  


    return (
            <div className="col-12 row mt-5">
                <div className="col-6 offset-3">

                    <h2>Change Password</h2>
                    <form onSubmit={onSubmitHandler}>

                       
                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <input name="password" className="form-control" 
                                value={formData.password} type="password"
                                id="password" autoComplete="off" onChange={onChangeHandler} />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="newPassword">New Password</label>
                            <input name="newPassword" className="form-control" 
                                value={formData.newPassword} type="password"
                                id="newPassword" autoComplete="off" onChange={onChangeHandler} />
                        </div>


                        <div className="form-group mt-3">
                            <label htmlFor="confirmPassword">Password ConFirm</label>
                            <input name="confirmPassword" className="form-control" 
                                value={formData.confirmPassword} type="password"
                                id="confirmPassword" autoComplete="off" onChange={onChangeHandler} />
                        </div>

                        
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button onClick={onReset} className="btn btn-danger ms-2">Clear</button>
                        </div>

                    </form>
                    

                    
                </div>
            </div>
        
    );
}
export default ChangePassword;