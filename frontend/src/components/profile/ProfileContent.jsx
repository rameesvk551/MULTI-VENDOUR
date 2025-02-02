import React, { useState } from "react";
import { Button } from '@mui/material'; // For buttons and core components
import { DataGrid } from '@mui/x-data-grid'; // For DataGrid
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import styles from "../../styles/style";



const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);


  useEffect(() => {
    
  }, []);

  const handleSubmit = (e) => {

  };

  const handleImage = async (e) => {
    
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={``}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
        <AllOrders /> 
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
       <AllRefundOrders /> 
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
        <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
      {/** <ChangePassword /> */}   
        </div>
      )}

      {/*  user Address */}
      
      {active === 7 && (
        <div>
         <Address /> 
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
    const orders = [
      {
        _id: "r4erkg3-rgvbfr3krgtvbofvdoo",
        orderItems: [
          {
            name: "I Phone 14",
          },
        ],
        totalPrice: 120,
        orderStatus: "processing",
      },
      {
        _id: "r4erkg3-rgvbfr3krgtvbofvdoo",
        orderItems: [
          {
            name: "I Phone 14",
          },
        ],
        totalPrice: 189,
        orderStatus: "pending",
      },
      {
        _id: "r4erkg3-rgvbfr3krgtvbofvdoo",
        orderItems: [
          {
            name: "I Phone 12",
          },
        ],
        totalPrice: 180,
        orderStatus: "shipped",
      },
    ];
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params) => {
          return params.row.status === "Delivered" ? "greenColor" : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          );
        },
      },
    ];
  
    const row = [];
  
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  
    return (
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    );
  };
  
  const AllRefundOrders = () => {
    const eligibleOrders = [
      {
        _id: "refund1",
        orderItems: [
          {
            name: "Samsung Galaxy S21",
          },
          {
            name: "Wireless Earbuds",
          },
        ],
        totalPrice: 250,
        status: "Processing refund",
      },
      {
        _id: "refund2",
        orderItems: [
          {
            name: "Apple MacBook Air",
          },
        ],
        totalPrice: 999,
        status: "Processing refund",
      },
      {
        _id: "refund3",
        orderItems: [
          {
            name: "Gaming Chair",
          },
          {
            name: "LED Desk Lamp",
          },
          {
            name: "Laptop Stand",
          },
        ],
        totalPrice: 400,
        status: "Processing refund",
      },
    ];
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params) => {
          return params.row.status === "Delivered" ? "greenColor" : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          );
        },
      },
    ];
  
    const rows = [];
  
    eligibleOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  
    return (
      <div className="pl-8 pt-1">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      </div>
    );
  };
  

  



  const TrackOrder = () => {
    // Dummy data for orders
    const orders = [
      {
        _id: "order1",
        cart: [
          {
            name: "Smartphone",
          },
          {
            name: "Headphones",
          },
        ],
        totalPrice: 350,
        orderStatus: "Processing",
      },
      {
        _id: "order2",
        cart: [
          {
            name: "Laptop",
          },
        ],
        totalPrice: 1000,
        orderStatus: "Shipped",
      },
      {
        _id: "order3",
        cart: [
          {
            name: "Tablet",
          },
          {
            name: "Stylus Pen",
          },
        ],
        totalPrice: 500,
        orderStatus: "Delivered",
      },
      {
        _id: "order4",
        cart: [
          {
            name: "Smartwatch",
          },
        ],
        totalPrice: 200,
        orderStatus: "Cancelled",
      },
    ];
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params) => {
          return params.row.status === "Delivered" ? "greenColor" : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          );
        },
      },
    ];
  
    const rows = orders.map((item) => ({
      id: item._id,
      itemsQty: item.cart.length,
      total: `US$ ${item.totalPrice}`,
      status: item.orderStatus,
    }));
  
    return (
      <div className="pl-8 pt-1">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    );
  };
  const Address = () => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
  
    // Dummy user data with addresses
    const user = {
      addresses: [
        {
          addressType: "Home",
          address1: "123 Main Street",
          address2: "Apartment 4B",
          city: "New York",
          country: "USA",
          zipCode: "10001",
        },
        {
          addressType: "Office",
          address1: "456 Corporate Blvd",
          address2: "Suite 12",
          city: "San Francisco",
          country: "USA",
          zipCode: "94105",
        },
      ],
      phoneNumber: "+1 123-456-7890",
    };
  
    const addressTypeData = [
      { name: "Default" },
      { name: "Home" },
      { name: "Office" },
    ];
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted");
    };
  
    const handleDelete = (address) => {
      console.log("Delete address:", address);
    };
  
    return (
      <div className="w-full px-5">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
            <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add New Address
              </h1>
              <div className="w-full">
                <form aria-required onSubmit={handleSubmit} className="w-full">
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="block pb-2">Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your country
                        </option>
                        {/* Add options dynamically if needed */}
                      </select>
                    </div>
                    {/* City */}
                    <div className="w-full pb-2">
                      <label className="block pb-2">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your city
                        </option>
                      </select>
                    </div>
                    {/* Address Inputs */}
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 1</label>
                      <input
                        type="text"
                        className="w-[95%] border h-[40px] rounded-[5px] px-2"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 2</label>
                      <input
                        type="text"
                        className="w-[95%] border h-[40px] rounded-[5px] px-2"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>
                    {/* Zip Code */}
                    <div className="w-full pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input
                        type="number"
                        className="w-[95%] border h-[40px] rounded-[5px] px-2"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    {/* Address Type */}
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address Type</label>
                      <select
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your Address Type
                        </option>
                        {addressTypeData.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Submit */}
                    <div className="w-full pb-2">
                      <input
                        type="submit"
                        className="mt-5 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            My Addresses
          </h1>
          <div
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Add New
          </div>
        </div>
        <br />
        {user.addresses.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">{user.phoneNumber}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}
        {user.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You don't have any saved addresses!
          </h5>
        )}
      </div>
    );
  };
  
{/*
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

*/}
export default ProfileContent;
