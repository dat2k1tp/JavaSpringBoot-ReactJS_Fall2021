import { useEffect, useState } from "react";
import axios from "axios";




const TaskRole = () => {
    //phai truyen tham so init de tranh undefined funtional map()
    //db ko co data => undefined
    const [listData, setListData] = useState
        ({
            roles: [],
            accounts: [],
            authorities: []
        });
   





    //load ALL DATA  
    useEffect(() => {

        axios({
            url: 'http://localhost:8080/rest/admin/authority',
            method: 'GET',
        })
            .then(function (response) {
                setListData(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });




    }, [])

   



    //xu ly THEM hoac XOA authority
    const onUpdate = (event, account, role) => {
        let index = onChecked(account, role);


        //xoa
        if (index >= 0 && event.target.checked === false) {

            axios({
                url: "http://localhost:8080/rest/admin/authority/" + listData.authorities[index].id,
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.status === 200) {
                        // vi Set state ko new update nen dung truc tiep nhu array
                        //set state gap loi
                        //1 :so phan tu can xoa
                        //tuong tac voi array truc tiep
                        listData.authorities.splice(index, 1);


                    }
                });
        }
        //them moi
        if (index === -1 && event.target.checked === true) {

            let authority = {
                accountId: account,
                roleId: role
            }

            axios({
                url: "http://localhost:8080/rest/admin/authority",
                method: 'POST',
                data: authority,

            })
                .then((response) => {
                    const { data } = response;
                    setListData({
                        ...listData,
                        data
                    });


                })
                .catch((error) => {
                    console.log(error);
                });
            //lay lai index,update thong tin
            window.location.reload();

        }
        //    console.log(listData)
        //    console.log(index);
    }



    //  FIND BY ID
    const onChecked = (account, role) => {
        // console.log(account);
        return listData.authorities.findIndex(a => a.accountId === account && a.roleId === role);
    }





    // console.log(listData)
    return (
        <div>
             <h3 className="text-center">List Authorizaton</h3>
            
            <table className="table table-bordered border-dark text-center">
                <thead className="table-dark">
                    <tr >
                        <th>Username</th>
                        {listData.roles.map((val, idx) => {

                            return (
                                <th key={idx} scope="col">{val.name}</th>
                            );
                        })

                        }
                    </tr>
                </thead>

                <tbody>
                    {listData.accounts.map((val, idx) => {
                        return (
                            <tr key={idx}>
                                <th scope="row">{val.username}</th>
                                {
                                    listData.roles.map((value, index) => {
                                        return (
                                            //defaultChecked là value const
                                            //phan trang bi bug 
                                            <td key={index}>
                                                <input type="checkbox"
                                                    defaultChecked={onChecked(val.id, value.id) >= 0 ? true : false}
                                                    onClick={(event) => onUpdate(event, val.id, value.id)}>
                                                </input>
                                            </td>
                                        );

                                    })
                                }

                            </tr>
                        )
                    })

                    }
                </tbody>
            </table>


        </div>
    )


}
export default TaskRole;

