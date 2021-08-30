import axios from 'axios';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const CreateProduct=({ formData, setFormData, listData, setListData, clicked, setClicked,categoryId})=>{
    //bat su kien khi input thay doi
    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData, //kiem soat cac thanh phan
            [name]: value

        });

    
    }

    
    //CREATE
    const onCreateStudent = () => {
        const url = 'http://localhost:8080/rest/admin/product?categoryId='+categoryId;
        axios({
            url: url,
            method: 'POST',
            data: formData,
        })
            .then((response) => {
                const { data } = response;
               
                setListData([
                    ...listData,
                    data,
                ]);
               
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const onUpdateStudent=()=>{
        const url='http://localhost:8080/rest/admin/product/'+formData.id+
        '?categoryId='+categoryId;
        axios({
            url:url,
            method:'PUT',
            data:formData,
        })
            .then((response)=>{
                const {data}=response;
                //cap nhat danh muc con chua ok
                setListData((oldState)=>{
                    return oldState.map((val,idx)=>{
                        return idx===clicked?data:val;
                    })
                });
                // console.log(clicked);
               
            })
            .catch((error)=>{
                console.log(error.response);
            });
            
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
                    image:response.data
                });
              
            })
            .catch((error)=>{
                console.log(error);
            })
    }
 
    //SUBMIT FORM
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (clicked === -1) {
            //CREATE
                
                onCreateStudent();
                setFormData({
                    id: "",
                    available: "",
                    name: "",
                    image:"cloud-upload.jpg",
                    price: ""
                });
         document.getElementById("upload-files").value = "";   
               
            
            
        }else{
            //UPDATE
                onUpdateStudent();
            
            
           
        }
    }
 
    // console.log(formData);
    //RESET
    const onClickResetForm = (event) => {
        event.preventDefault();
        setFormData({
            id: "",
            available: "",
            name: "",
            image:"cloud-upload.jpg",
            price: ""
        });
        document.getElementById("upload-files").value = "";
       
        setClicked(-1);
    }

     //ALERT
     const [open, setOpen] = useState(false);
     //set up thong bao
     let text = "";
     if (clicked === -1) {
         text = "Thêm mới thành công";
     } else if (clicked >= 0) {
         text = "Cập nhật thành công";
     }
 
     const clickAlertHandle = () => {
         setOpen(true);
     };
 
     const handleClose = (event, reason) => {
         if (reason === 'clickaway') {
             return;
         }
         setOpen(false);
     };

    //  console.log(categoryId);

     return (
        //  
        <div className="mt-5 col-12">
            <form  onSubmit={onSubmitHandler}>
                
                    <TextField readOnly fullWidth label="Id" variant="filled"
                        value={formData.id} name="id"  onChange={onChangeHandler} />

                    <TextField fullWidth label="Name" value={formData.name} 
                        name="name" onChange={onChangeHandler} />

                    <TextField fullWidth label="Image"  
                        name="image" id="upload-files" type="file" accept="image/*" 
                        onChange={(event)=>upLoadFile(event)} />
                

                    <TextField fullWidth label="Available" value={formData.available} 
                        name="available" onChange={onChangeHandler} />

                    
                    <TextField fullWidth label="Price" value={formData.price} 
                        name="price" onChange={onChangeHandler} />
              
               


                <div style={{ marginTop: '10px' }}>
                    <button type="submit" className="btn btn-success"
                        onClick={clickAlertHandle}>Submit</button>
                    <button style={{ marginLeft: '10px' }} className="btn btn-danger"
                        onClick={onClickResetForm}>Reset</button>
                </div>






                <Snackbar anchorOrigin={{
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
export default CreateProduct;