const TaskSearch=({setKeyWord,keyword})=>{
    return(
        <div className="col-12 row mt-5">
		    <div className="col-6 offset-3">
                <nav className="navbar navbar-light bg-light">

                    <div className="input-group">

                        <input 
                            className="form-control mr-sm-2" 
                            type="search" 
                            placeholder="Nhập tên khách hàng" 
                            aria-label="Search"
                            name="keyword"
                            value={keyword}  
                            onChange={(event)=>setKeyWord(event.target.value)}/>

                    </div>

                </nav>
            </div>
        </div>
    )
}
export default TaskSearch;