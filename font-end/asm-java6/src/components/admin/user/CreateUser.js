import axios from 'axios';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const CreateUser=({formData,setFormData,listData,setListData,clicked,setClicked})=>{
              //bat su kien khi input thay doi
    const onChangeHandler=(event)=>{
        const{name,value}=event.target;
        
            setFormData({
                ...formData, //kiem soat cac thanh phan
                [name]:value,
                
            });
        
        // console.log(formData)
    }   
    
    //CREATE
    const onCreateStudent=()=>{
        const url='http://localhost:8080/rest/admin/user';
        axios({
            url: url,
            method:'POST',
            data:formData,
        })
            .then((response)=>{
                const{data}=response;
                setListData([
                    ...listData,
                    data,
                ]);
            })
            .catch((error)=>{
                console.log(error.response);
            })
    }


    //UPLOAD FILE
    
    const upLoadFile=(event)=>{
        const{files}=event.target;
        console.log(files)
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
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        
            //CREATE
            onCreateStudent();
            setFormData({
                id:"",
                username: "",
                password: "",
                name: "",
                email:"",
                photo : "cloud-upload.jpg" 
            });
            document.getElementById("upload-files").value = "";   
       
    }

    //RESET
    const onClickResetForm=(event)=>{
        event.preventDefault();
        setFormData({
            id:"",
            username: "",
            password: "",
            name: "",
            email:"",
            photo : "cloud-upload.jpg" 
        });
        setClicked(-1);
        document.getElementById("upload-files").value = "";   
    }


    
    //ALERT
    const [open, setOpen] = useState(false);
    //set up thong bao
    let text = "Thêm mới thành công";
    

    const clickAlertHandle = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // console.log(formData.roles[0].id);
    return(
        //  
        <div className="mt-5 col-12 ">
                <form  onSubmit={onSubmitHandler}>
                        <TextField disabled fullWidth label="Id" variant="filled"
                        value={formData.id} name="id"  onChange={onChangeHandler} />
                
                         <TextField fullWidth label="Username" value={formData.username} 
                        name="username" onChange={onChangeHandler} />

                        <TextField fullWidth label="Password" value={formData.password} 
                        name="password" onChange={onChangeHandler} type="password"/>

                        <TextField fullWidth label="Name" value={formData.name} 
                          name="name" onChange={onChangeHandler} /> 

                        <TextField fullWidth label="Email" value={formData.email} 
                        name="email" onChange={onChangeHandler} />
                
                         <TextField fullWidth label="Image"  
                        name="photo" id="upload-files" type="file" accept="image/*" 
                        onChange={(event)=>upLoadFile(event)} />

    
                    <div>
                        <button type="submit" className="btn btn-success" 
                        onClick={clickAlertHandle}>Create</button>
                        <button style={{marginLeft:'10px'}} className="btn btn-danger" 
                        onClick={onClickResetForm}>Reset</button>
                    </div>
                    
                    
                
                    

        
                    <Snackbar  anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} open={open} autoHideDuration={5000} onClose={handleClose}>
                            
                        <Alert onClose={handleClose} severity="success" variant="filled" >
                            {text}
                        </Alert>
                    </Snackbar>
                </form>
        </div>
    );

}
export default CreateUser;