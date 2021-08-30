import axios from 'axios';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const CreateCategory = ({ formData, setFormData, listData, setListData, clicked, setClicked }) => {
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
        const url = 'http://localhost:8080/rest/admin/category';
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
        const url=`http://localhost:8080/rest/admin/category/${listData[clicked].id}`;
        axios({
            url:url,
            method:'PUT',
            data:formData,
        })
            .then((response)=>{
                const {data}=response;
                setListData((oldState)=>{
                    return oldState.map((val,idx)=>{
                        return idx===clicked?data:val;
                    })
                });
               
            })
            .catch((error)=>{
                console.log(error.response);
            });
            
    }

    //SUBMIT FORM
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (clicked === -1) {
            //CREATE
            
            onCreateStudent();
            setFormData({
                id: "",
                name: ""
            });
        }else{
            //UPDATE
            onUpdateStudent();
        }
    }
 
    //RESET
    const onClickResetForm = (event) => {
        event.preventDefault();
        setFormData({
            id: "",
            name: ""
        });
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

    
    return (
        //  
        <div className="mt-5 col-12">
            <form  onSubmit={onSubmitHandler}>
                
                    <TextField disabled={true} fullWidth label="Id" variant="filled"
                        value={formData.id} name="id"  onChange={onChangeHandler} />
                
                         <TextField fullWidth label="Name" value={formData.name} 
                        name="name" onChange={onChangeHandler} />
              
               


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
export default CreateCategory;