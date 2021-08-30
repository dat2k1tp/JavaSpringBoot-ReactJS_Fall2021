import { useState } from "react";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm: '',
        name: '',
        email: '',
        photo: 'l60Hf.png'
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    //CREATE
    const onCreateStudent = () => {
        const url = 'http://localhost:8080/rest/admin/user';
        axios({
            url: url,
            method: 'POST',
            data: formData,
        })
            .then((response) => {
                console.log("REGISTER SUCCESS");
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    //SUBMIT FORM
    const onSubmitHandler = (event) => {
        event.preventDefault();
       
            //CREATE
            onCreateStudent();
            setFormData({ username: '',password: '', confirm: '',
               name: '',email: '',photo: 'l60Hf.png'});
            setOpen(true);
        
    }

     //ALERT
     const [open, setOpen] = useState(false);
     //set up thong bao
 
     const handleClose = (event, reason) => {
         if (reason === 'clickaway') {
             return;
         }
         setOpen(false);
     };
 

    return (
        <div className="row" >
            <div className="col-12">
                <div className="col-6 offset-3">

                    <h2>Register</h2>
                    <form onSubmit={onSubmitHandler}>

                        <div className="form-group mt-3">
                            <label htmlFor="username">Username</label>
                            <input name="username" className="form-control" 
                                value={formData.username}
                                id="username" autoComplete="off" onChange={onChangeHandler} />
                        </div>


                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <input name="password" className="form-control" 
                                value={formData.password}
                                id="password" autoComplete="off" onChange={onChangeHandler} />
                        </div>


                        <div className="form-group mt-3">
                            <label htmlFor="confirm">Password ConFirm</label>
                            <input name="confirm" className="form-control" 
                                value={formData.confirm}
                                id="confirm" autoComplete="off" onChange={onChangeHandler} />
                        </div>

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
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <a className="btn btn-danger" href="/register">Clear</a>
                        </div>

                        <a style={{ fontFamily: 'courier,arial,helvetica', texDecoration: 'none', float: 'right' }}
                            className="fst-italic fs-5"
                            href="/"><b>Login</b></a>
                    </form>
                    

                    <Snackbar  anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} open={open} autoHideDuration={5000} onClose={handleClose}>
                            
                        <Alert onClose={handleClose} severity="success" variant="filled" >
                            Đăng ký thàng công !
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    );
}
export default Register;