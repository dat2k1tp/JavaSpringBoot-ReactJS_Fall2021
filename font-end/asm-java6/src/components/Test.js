import TextField from '@material-ui/core/TextField';
import {useState,useEffect} from 'react';

const Test =()=>{
    // {danhMucId}
    const formDataInitValue = {
        id: "",
        name: ""
    }
   
    console.log(danhMucId);
    const [formData, setFormData] = useState(formDataInitValue);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData, //kiem soat cac thanh phan
            [name]: value
        });
       
       
    }
    // useEffect(()=>{
    //     setFormData({
    //         ...formData,
    //         danhMucId
    //     })
    // },[danhMucId])

    console.log(formData);

    return (
        <div>
            <form  >
                
                <TextField disabled={true} fullWidth label="Id" variant="filled"
                    value={formData.id} name="id"  onChange={onChangeHandler} />
            
                     <TextField fullWidth label="Name" value={formData.name} 
                    name="name" onChange={onChangeHandler} />
          
           

            </form>
        </div>
    )
}
export default Test;