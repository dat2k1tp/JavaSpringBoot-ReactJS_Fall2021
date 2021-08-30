import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
const NavUs =({isLogin, setIsLogin})=>{
	//data init
	const formDataInitValue = {
		id: "",username: "",password: "",name: "",
		email: "",photo: "",roles: []
		 }
		
	 
	const [account, setAccount] = useState(formDataInitValue);
	//LOGOUT
	const logOut=()=>{
		localStorage.removeItem('account');
		setIsLogin(false);
	}
	
  
	//GET DATA TO LOCAL
	useEffect(() => {
		let json = localStorage.getItem("account")
		const initValue = {
			id: "",username: "",password: "",name: "",
			email: "",photo: "",roles: []
		}
		setAccount(
		  json ? JSON.parse(json) : initValue
		)
	  }, []);

    return(
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#fd7e14'}}>
	
	    <div className="container-fluid">
	        <Link className="navbar-brand" to="/home">
	        <i className="fa fa-credit-card"></i>  SHOPPING NOW</Link>
	      
			
	      		
	         {/* Content */}
	           <div className="d-flex">
	           
	               	<div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
						  
						  <Link className="navbar-brand"  to="/user/cart">

							<i className="fa fa-shopping-cart"> Cart</i>
						
						  </Link>
						  
						  <ul className="navbar-nav">
						     <li className="nav-item dropdown">
						         <a className="nav-link dropdown-toggle active" href="123" id="navbarDarkDropdownMenuLink" 
						         role="button" data-bs-toggle="dropdown" aria-expanded="false">
						         		 <i className="fa fa-user-circle"></i> Xin chào, {account.name}
						         </a>
						         <ul className="dropdown-menu" 
                                 aria-labelledby="navbarDarkDropdownMenuLink" style={{backgroundColor:'#fd7e14'}}>
						         
	 								<li><Link className="dropdown-item" to="/user/order">Order</Link></li>
						            <li><Link className="dropdown-item" to="/user/edit-profile">Edit Profile</Link></li>
						            <li><Link className="dropdown-item" to="/user/change-password">Change Password</Link></li>
						            <li onClick={logOut}>
										<a className="dropdown-item" href="http://localhost:3000"
										>Logout</a>
									</li>
	 								
	
						            
						             {/* <li><a className="dropdown-item" href="123">Login</a></li> */}
						           
						         </ul>
						     </li>
						  </ul>
						  
					</div>
					
	            </div>
	            
	        </div>
	         
	    
	    </nav>
    );
}
export default NavUs;