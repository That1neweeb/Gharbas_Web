import DataTable from "react-data-table-component";

const UserTable = () => {

    const responseData =[
        {name:"Ram", age:24, email:"ram@example.com", password:"ram1234"},
        {name:"Shyam", age:22, email:"shyam@example.com", password:"shyam1234"},
        {name:"Sita", age:26, email:"sita@example.com", password:"sita1234"},
        {name:"Hari", age:23, email:"hari@example.com", password:"hari1234"}
    ];
    const columns =[
        {name:"Name", selector:(row) => row.name, sortable:true},
        {name:"Age", selector:(row) => row.age, sortable:true},
        {name:"Email", selector:(row) => row.email, sortable:true},
        {name:"Password", selector:(row) => row.password, sortable:true}    
    ];
    return <>
    <DataTable
    columns={columns}
    data={responseData}
    pagination
    highlightOnHover
    />
    </>;
};

export default UserTable;