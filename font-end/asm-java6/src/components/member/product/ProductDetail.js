import { useEffect,useState } from "react";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
const ProductDetail=()=>{
   
    const[cart,setCart]=useState([]);
     
     useEffect(() => {
        let json = localStorage.getItem("cart")
        setCart(
            json ? JSON.parse(json) : []
        )
    }, [])
   
        
    const formDataInitValue = {
        id: "",
        available: "",
        createDate: "",
        deletedAt: "",
        image: "245c0efb.jpg",
        name: "",
        price: "",
        categoryId: ""
    }
   const[formData,setFormData]=useState(formDataInitValue);
   const [listCate, setListCate] = useState([]);
  

     //LOAD PRODUCT
     useEffect(() => {
      let id=Number(localStorage.getItem("productId"))
      console.log(id);
      const url = 'http://localhost:8080/rest/admin/product/'+id;
      axios({
          url: url,
          method: 'GET',
      })
          .then((response) => {
              const { data } = response;
              setFormData(data);
          })
          .catch((error) => {
              console.log(error, error.response);
          });
      }, []);


    
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


    //IMAGE URL
    const imgURL = `http://localhost:8080/rest/file/images`;
    // console.log(`${imgURL}/${formData.image}`)


     //GIO HANG  
     const addToCart =(product)=>{
        let newCart=[...cart];
        let itemInCart=newCart.find(
            (item)=>product.name===item.name
        );
        if(itemInCart){
            itemInCart.quantity++;
        }else{
            itemInCart={
                ...product,
                quantity:1,
            }
            newCart.push(itemInCart)
        }
        setCart(newCart)
        
        
        saveToLocalStorage(newCart);
          
        
        setOpen(true);

    }
    // console.log(cart)
    
// console.log(cart)
    //SAVE LOCAL
    const saveToLocalStorage=(product)=>{
       
        let json=JSON.stringify(product)
        localStorage.setItem("cart",json);
    }

    //ALERT
    const [open, setOpen] =useState(false);
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <div className="card-group position-absolute top-50 start-50 translate-middle" 
        style={{width:'40rem',height:'30rem'}}>
          <div className="card border border-dark" >
             
                <img src={`${imgURL}/${formData.image}`}
                 className="card-img-top" alt="bug" width="250" height="200" />
               <div className="card-body text-center">
                  <h5 className="card-title text-uppercase"><i>Name</i>: {formData.name}</h5>
                  <p className="card-text text-capitalize"><b>Category</b>: {listCate.map((val,idx)=>{
                        return val.id===formData.categoryId?val.name:""
                  })}</p>
                  <p className="card-text"><b>Price</b>: {formData.price}</p>
                  <p className="card-text"><b>Available</b>: {formData.available}</p>
                  <p className="card-text"><i>{formData.available>0?"Còn hàng":"Hết hàng"}</i></p>
                  <p className="card-text"><small className="text-muted">
                  <b>Date Created</b>: {formData.createDate.substring(0,10)}</small></p>
                  <button className="btn btn-info" onClick={()=>addToCart(formData)}>Add To Cart</button>
                  <Link to="/home" className="btn btn-dark ms-1">Go to home</Link>
               </div>
              </div>

              
            <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    
                    open={open} autoHideDuration={700} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled"  severity="success" >
                        Đã thêm vào giỏ hàng !
                    </Alert>
                </Snackbar>
        </div>


      
      
    );
}
export default ProductDetail;
