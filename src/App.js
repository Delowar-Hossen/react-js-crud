import React, { useState, useEffect } from 'react';
import './App.css';
import {EmployeeData} from './EmployeeData';

function App() {

  const [data, setData]           = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [age, setAge]             = useState('');
  const [id, setId]               = useState(0);
  const [isUpdate, setIsUpdate]   = useState(false);

  useEffect( () => {

    setData(EmployeeData)

  }, []);

  const handleEdit = (id) =>{
    const dt = data.filter(item => item.id === id);
    if( dt !== undefined ){
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }

  const handleDelete = (id) =>{
    if( id > 0 ){
      if(window.confirm("Are you sure to delete this item?")){

        const dt = data.filter(item => item.id !== id);
        setData(dt);

      }
    }
  }

  const handleSave = (e) =>{
    let error = '';

    if(firstName === '')
      error += "First Name is Required, ";

    if(lastName === '')
      error += "Last Name is Required, ";

    if(age <= 0 )
      error += "Age is Required, ";
    

      if(error === ''){
        e.preventDefault();
        const dt = [...data];
        const newObject = {
                  id:EmployeeData.length + 1,
                  firstName: firstName,
                  lastName: lastName,
                  age: age
        }
        dt.push(newObject);
        setData(dt);
        handleClear();

      }else{
        alert( error );
      }


  }

  const handleUpdate = () =>{
    const index = data.map((item, index) => {
        return item.id
    }).indexOf(id);

    const dt            = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName  = lastName;
    dt[index].age       = age;

    setData(dt);
    handleClear();
  }

  const handleClear = () =>{
    //alert(id);
      setId(0);
      setFirstName('');
      setLastName('');
      setAge('');
      setIsUpdate(false);
  }



  return (
    <div className="App">

      <div style={{display:'flex', justifyContent: 'center', margin:'15px auto'}}>
        <div>
          <label>Frist Name</label>
          <input type="text" name="firstName" onChange={ (e) => setFirstName(e.target.value) } value={firstName} placeholder="Enter First Name" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" onChange={ (e) => setLastName(e.target.value) } value={lastName}  placeholder="Enter Last Name" />
        </div>
        <div>
          <label>Age</label>
          <input type="text" name="age" onChange={ (e) => setAge(e.target.value) } value={age}  placeholder="Enter Age" />
        </div>
        <div>
        {
          !isUpdate ? 
          <button className="btn btn-primary" onClick={(e) => handleSave(e) }>Save</button>
          :
          <button className="btn btn-primary" onClick={() => handleUpdate() }>Update</button>
        }

          <button className="btn btn-danger" onClick={() => handleClear() }>Clear</button>
        </div>
      </div>

      <table className="table striped bordered hover">
        <thead>
          <tr>
            <td>Sl. No</td>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,index) => {
              return(
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className="btn btn-primary" onClick={ () => handleEdit(item.id) } >Edit</button> &nbsp;
                    <button className="btn btn-danger" onClick={ () => handleDelete(item.id) } >Delete</button>

                  </td>
                </tr>
              )

            })
          }
        </tbody>
      </table>
     
    </div>
  );
}

export default App;
