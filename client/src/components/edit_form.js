import React,{useEffect,useState}from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import {  Navigate,useParams,useNavigate} from 'react-router-dom';


function Edit_form() {
    const navigate=useNavigate();
    const {id}=useParams();
 
    const [input, setInput] = useState({
            dis_ID: "",
            name: "",
            email: "",
            contact_no: "",
            address: "",
            medicines: [],
            payments: "",
            ammount:"",
            remark:""
    });
    const [medicines, setMedicines] = useState([{
        name: "",
        quantity: ""
    }]);

    const medicineNames = ["Medicine A", "Medicine B", "Medicine C", "Medicine D"];

    useEffect(()=>{
        const getAllData=async()=>{
              const res=await axios.get(`http://localhost:9000/api/v1/distributors/single/${id}`);
              const data = res.data;
              data.isValidContact_No = true;
              data.isValidNic=true; // Set isValidContact_No to true
              setInput(data);
              console.log("dis:", setInput);
        };
        getAllData();
               },[id])

               const data = {
                ...input,
                medicines: medicines.map((medicine) => ({ medicine: medicine.name, quantity: medicine.quantity })),
            };
    
const handleUpdate=async (e) =>{
    e.preventDefault();
    const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to update this distributor.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      });
      
      if (!input.isValidNic) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid NIC number',
          text: 'Please enter a valid NIC number',
        });
        return;
      }
      if (!input.isValidContact_No) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Phone number',
          text: 'Please enter a valid Phone number',
        });
        return;
      }
      if (confirmed.isConfirmed){await axios.put(`http://localhost:9000/api/v1/distributors/${id}`,data);
    navigate('/edit');
    }else{
        navigate('/edit');
    }
    };
    const handleAddFields = () => {
        const values = [...medicines];
        values.push({ name: "", quantity: "" });
        setMedicines(values);
    };

    const handleRemoveFields = (index) => {
        const values = [...medicines];
        values.splice(index, 1);
        setMedicines(values);
    };
    const handleInputChange = event => {
        const { name, value } = event.target;
       
        let isValidNic = input.isValidNic;
        let isValidContact_No=input.isValidContact_No
        // Check if the input field being updated is the NIC field
        if (name === 'dis_ID') {
          // NIC validation logic
          isValidNic = false;
          if (value.length === 10 && value.match(/^\d{9}[vVXx]$/)) {
            isValidNic = true;
          } else if (value.length === 12 && value.match(/^\d{12}$/)) {
            isValidNic = true;
          }
        }
        if (name === 'contact_no') {
            // Check if the input field being updated is the contactNo field 
             isValidContact_No = false;
             if (value.length === 10) {
                 isValidContact_No = true;
             } 
           }
        //setInput({ ...input, [name]: value });
        setInput({ ...input, [name]: value,
             isValidContact_No: isValidContact_No,
            isValidNic:isValidNic
        });
      };

      const handleMedInputChange = (index, event) => {
        const values = [...medicines];
        values[index][event.target.name] = event.target.value;
        setMedicines(values);


    };

    
  return (
    <div className='container'>
    <form onSubmit={handleUpdate}>
        <div className='row'>
            <h4><b>personel Details</b></h4><br></br>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">Dis.NIC</label>
                <input
                    name="dis_ID"
                    value={input.dis_ID}
                    onChange={handleInputChange}
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
                 {!input.isValidNic && (
          <span style={{ color: "red" }}>Invalid NIC number</span>
        )}

            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Name</label>
                <input
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">email</label>
                <input
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                    type="email"
                    class="form-control"
                    id="exampleInputPassword1"
                />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">contact no</label>
                <input
                    name="contact_no"
                    value={input.contact_no}
                    onChange={handleInputChange}
                    type="number"
                    class="form-control"
                    id="exampleInputPassword1"
                />
                {!input.isValidContact_No && (
                            <span style={{ color: "red" }}>Invalid Phone number</span>
                          )}
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">address</label>
                <input
                    name="address"
                    value={input.address}
                    onChange={handleInputChange}
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                />
            </div>
            <h4><b>Distribution Details</b></h4><br></br>
            <div>
                <label for="exampleInputPassword1" class="form-label">Order Details</label>
                <div className="medlist mt-5">
                    <div className="overflow-y-scroll">
                        {medicines.map((medicine, index) => (
                            <div key={index} style={{ marginBottom: "20px" }}>
                                <select
                                    name="name"
                                    value={medicines[index].name}
                                    onChange={(event) => handleMedInputChange(index, event)}
                                    style={{ marginRight: "20px" }}
                                >
                                    <option value="">Select item</option>
                                    {medicineNames.map((name, i) => (
                                        <option key={i} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Quantity"
                                    name="quantity"
                                    value={medicines[index].quantity}
                                    onChange={(event) => handleMedInputChange(index, event)}
                                    style={{ marginRight: "20px" }}
                                />
                                <button  class="btn btn-danger me-5" type="button" onClick={() => handleRemoveFields(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button  class="btn btn-primary me-5 mt-2" type="button" onClick={() => handleAddFields()} style={{ marginRight: "20px" ,width: "150px",height:"40px"}}>
                        Add Order
                    </button>
                    </div>
            </div>

            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Ammount</label>
                <input
                    name="ammount"
                    value={input.ammount}
                    onChange={handleInputChange}
                    type="number"
                    class="form-control"
                    id="exampleInputPassword1"
                />
            </div>



        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input"
                type="radio"
                name="payments"
                value="paied"
                checked={input.payments === 'paied'}
                onChange={handleInputChange}
            />
            <label class="form-check-label" for="flexRadioDefault1">
                paied
            </label>
        </div>

        <div class="form-check form-check-inline my-3">
            <input class="form-check-input"
                type="radio"
                name="payments"
                value="unpaid"
                checked={input.payments === 'unpaid'}
                onChange={handleInputChange}
            />

            <label class="form-check-label"
                for="flexRadioDefault2">
                unpaid
            </label>
        </div>
        <div>
                        <label for="exampleInputPassword1" class="form-label mt-5">Remark</label>
                        <textarea
                            name="remark"
                            value={input.remark}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        ></textarea>
                    </div>
              
                <button type="submit" class="btn  mb-5 btn-primary mt-5">Update</button>
                          
               
                        
                       
                       
                
               
            </form>
        </div>
  )
}

export default Edit_form