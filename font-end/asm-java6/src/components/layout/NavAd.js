import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
const NavAd =({setIsLogin,isLogin})=>{
	const formDataInitValue = {
		id: "",username: "",password: "",name: "",
		email: "",photo: "l60Hf.png",roles: []
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
			email: "",photo: "l60Hf.png",roles: []
		}
		setAccount(
		  json ? JSON.parse(json) : initValue
		)
	  }, []);

	  //IMG URL
	  const imgURL = `http://localhost:8080/rest/file/images`;
	 
    return(
		
        	<div>
                
				<nav className="navbar nvbar-expand-md navbar-dark bd-dark flex-md-column
				 flex-row align-items-center py-2 text-center sticky-top" id="slidebar">
				 
                    {/* image */}
					<div className="text-center p-4">
						<img src={`${imgURL}/${account.photo}`}
						 alt="profile"
						 className="img-fluid rounded-circle my-4 p-1 d-none d-md-block shadow" />
					</div>
					{/* <!-- chuoi dai hon 22 substring --> */}
					<i className="navbar-brand mx-0 font-weight-bold text-nowrap">Hello, </i>
					<h3 className="navbar-brand mx-0 font-weight-bold text-nowrap">{account.name}</h3>
						
					{/* Content1 */}
                    <nav className="navbar navbar-dark bg-dark">
					   <div className="container-fluid">
					      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
						  data-bs-target="#navbarToggleExternalContent" 
                          aria-controls="navbarToggleExternalContent" aria-expanded="false" 
						  aria-label="Toggle navigation">
					      	<i className="fa fa-address-card"></i> USERS
					      </button>
					   </div>
					</nav>

					<div className="collapse" id="navbarToggleExternalContent">
						   <div className="bg-dark p-4">
						     	<ul className="navbar-nav flex-column w-100 justify-content-center">
									<li className="nav-item">
										<Link className="nav-link active" to="/admin/user/list" >
											User List </Link>
									</li>
									
									<li className="nav-item">
										<Link className="nav-link active" to="/admin/user/recycle-bin" >
											Recycle Bin</Link>
									</li>
								</ul>
						   </div>
					</div>


                    {/* End Content 1 */}
					

					{/* Content2 */}
					<nav className="navbar navbar-dark bg-dark">
					   <div className="container-fluid">
					      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
						  data-bs-target="#navbarToggleExternalContent2" 
                          aria-controls="navbarToggleExternalContent2" aria-expanded="false" 
						  aria-label="Toggle navigation">
					      	<i className="fa fa-truck"></i> ORDERS
					      </button>
					   </div>
					</nav>

					<div className="collapse" id="navbarToggleExternalContent2">
						   <div className="bg-dark p-4">
						     	<ul className="navbar-nav flex-column w-100 justify-content-center">
									<li className="nav-item">
										<Link to="/admin/order/list" 
										className="nav-link active">Order List</Link>
									</li>
									
									<li className="nav-item">
										<Link to="/admin/order/recycle-bin"
										className="nav-link active">Recycle Bin</Link>
									</li>
								</ul>
						   </div>
					</div>


                    {/* End Content 2 */}

					
					{/* Content3 */}
					<nav className="navbar navbar-dark bg-dark">
					   <div className="container-fluid">
					      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
						  data-bs-target="#navbarToggleExternalContent3" 
                          aria-controls="navbarToggleExternalContent3" aria-expanded="false" 
						  aria-label="Toggle navigation">
					      	<i className="fa fa-balance-scale"></i> PRODUCTS
					      </button>
					   </div>
					</nav>

					<div className="collapse" id="navbarToggleExternalContent3">
						   <div className="bg-dark p-4">
						     	<ul className="navbar-nav flex-column w-100 justify-content-center">
									<li className="nav-item">
										<Link to="/admin/product/list" className="nav-link active">Product List</Link>
									</li>
									
									<li className="nav-item">
										<Link to="/admin/product/recycle-bin" className="nav-link active">Recycle Bin</Link>
									</li>
								</ul>
						   </div>
					</div>
					{/* End Content 3 */}

					
					{/* Content4 */}
					<nav className="navbar navbar-dark bg-dark">
					   <div className="container-fluid">
					      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
						  data-bs-target="#navbarToggleExternalContent4" 
                          aria-controls="navbarToggleExternalContent4" aria-expanded="false" 
						  aria-label="Toggle navigation">
					      	<i className="fa fa-book"></i> CATEGORIES
					      </button>
					   </div>
					</nav>

					<div className="collapse" id="navbarToggleExternalContent4">
						   <div className="bg-dark p-4">
						     	<ul className="navbar-nav flex-column w-100 justify-content-center">
									<li className="nav-item">
										<Link to="/admin/category/list" className="nav-link active">Category List</Link>
									</li>
									
									<li className="nav-item">
										<Link to="/admin/category/recycle-bin" className="nav-link active">Recycle Bin</Link>
									</li>
								</ul>
						   </div>
					</div>
					{/* End Content 4 */}


					
					{/* Content5 */}
					<nav className="navbar navbar-dark bg-dark">
					   <div className="container-fluid">
					      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
						  data-bs-target="#navbarToggleExternalContent5" 
                          aria-controls="navbarToggleExternalContent5" aria-expanded="false" 
						  aria-label="Toggle navigation">
					      	<i className="fa fa-users"></i> AUTHORIZATION
					      </button>
					   </div>
					</nav>

					<div className="collapse" id="navbarToggleExternalContent5">
						   <div className="bg-dark p-4">
						     	<ul className="navbar-nav flex-column w-100 justify-content-center">
									<li className="nav-item">
										<Link to="/admin/authorization" className="nav-link active"> List</Link>
									</li>
								</ul>
						   </div>
					</div>
					{/* End Content 5 */}


					
					{/* Content6 */}
					{/* <nav className="navbar navbar-dark bg-dark">
					   <div className="container-fluid">
					      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
						  data-bs-target="#navbarToggleExternalContent6" 
                          aria-controls="navbarToggleExternalContent6" aria-expanded="false" 
						  aria-label="Toggle navigation">
					      	<i className="fa fa-bar-chart"></i> REPORTS
					      </button>
					   </div>
					</nav>

					<div className="collapse" id="navbarToggleExternalContent6">
						   <div className="bg-dark p-4">
						     	<ul className="navbar-nav flex-column w-100 justify-content-center">
									<li className="nav-item">
										<a href="1" className="nav-link active"> List</a>
									</li>
								</ul>
						   </div>
					</div> */}
					{/* End Content 6 */}


					{/* logout */}
					<nav className="navbar navbar-dark bg-dark" onClick={logOut}>
						  <div className="container-fluid">
						    	<a className="btn btn-dark fs-5" 
						    	style={{fontFamily:'courier,arial,helvetica'}}
								href="http://localhost:3000">Logout</a>
						  </div>
					</nav>
					{/* End Logout	 */}
				</nav>
				
		



        	</div>
			
            
    );
}
export default NavAd;