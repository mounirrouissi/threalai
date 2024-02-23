import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

// import config from '../config/config';
import state from '../../store';
// import { download } from '../public/images';
import { downloadCanvasToImage, reader } from '../../lib/utils';
import { EditorTabs, FilterTabs, DecalTypes } from '../../config/constants';
import { fadeAnimation, slideAnimation } from '../../config/motion';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router'

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../../components/three';
import '../index.css'
import TshirtSizePicker from '../../components/three/TshirtSizePicker';
import DependentSelectExample from './DependentSelectExample';
import Image from 'next/image';
import { isMobile } from '../../config/helpers';

import { createClient } from "@supabase/supabase-js";
import { Checkbox, FormControlLabel, Link } from '@mui/material';

const supabase = createClient("https://ygoywdggbolrtwuducox.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnb3l3ZGdnYm9scnR3dWR1Y294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MDgyNTQsImV4cCI6MjAyMzM4NDI1NH0.RLoJRoMqJKdzuHrN2ZvBBYrzfRb73YeQJlAVEZjvGs4");



const Customizer = () => {
  const snap = useSnapshot(state);
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTexture, setActiveFilterTexture] = useState({
    logoShirt: true,
    logoFrame: false,
  }) 
  const [activeFilterTab, setActiveFilterTab] = useState("Tshirt")
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    termsAccepted: false,
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [touched, setTouched] = useState({ email: false, phone: false });

  const [openCart, setOpenCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedRegion, setSelectedRegion] = useState('1');
  const [selectedCity, setSelectedCity] = useState('');
  const [tshirtNumber, setTshirtNumber] = useState('1');
  const [tshirtSize, setTshirtSize] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [imageUrl,setImageUrl] = useState('');

  useEffect(() => {
   setImageUrl(localStorage.getItem('imageUrl') )

    console.log("imageUrl =" + imageUrl);
    console.log("seleRegion =" + selectedRegion)
    if (imageUrl) {
      handleDecals("Tshirt", imageUrl);
    }
    setActiveEditorTab('')
  }, []);

  useEffect(()=>{
      // Retrieve orders from local storage
  const savedOrders = localStorage.getItem('orders');
  const totalPrice = localStorage.getItem('totalPrice');
  console.log("totalPrice: " + totalPrice)

  console.log("savedOrders: " + savedOrders);
  if (savedOrders) {
    setOrders(JSON.parse(savedOrders));
    setCartCount(JSON.parse(savedOrders).length);
  }
  if(totalPrice){
    setTotalPrice(JSON.parse(totalPrice))
  }
    if (activeFilterTab === "Frame")
    setActiveEditorTab('')

  },[activeFilterTab])

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  
 const  handleOpenCartCart = () => {
  console.log("openCart: " + openCart);
  setOpenCart(true);
 }

const handleAddToCart = () => {

  console.log("ActiveFilterText: " + activeFilterTab);
  console.log("number of orders : " + tshirtNumber);
  

  if(!tshirtSize && (activeFilterTab !== "Frame") )
  {
  setAlertMessage("Please select an size before you can add to cart") 
  handleAlertMessaage()
}
 else {
  console.log("Adding to cart");
  setCartCount(prevCount => prevCount +   1);


  let productPrice = 0;
  if (activeFilterTab === "Tshirt") {
    productPrice = 39;
  } else if (activeFilterTab === "Hoodie") {
    productPrice = 65;
  } else {
    productPrice = 44; // Assuming this is the price for other items like "Frame"
  }

 // Update total price state and save to local storage
setTotalPrice(prevPrice => {
  const updatedTotalPrice = prevPrice + (productPrice * tshirtNumber);
  // Save updated total price to local storage
  localStorage.setItem('totalPrice', updatedTotalPrice.toString());
  return updatedTotalPrice;
});



  const newOrder = {
    type: activeFilterTab,
    color:snap.color,
    size: tshirtSize,
    ordernumber: tshirtNumber, // Assuming ordernumber is the next number in the sequence
  };

 // Update orders state and save to local storage
    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders, newOrder];
      // Save updated orders to local storage
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });


  console.log("before inserting total price "+ totalPrice)  

  localStorage.setItem('totalPrice', totalPrice);




  setTshirtSize("")
  setTshirtNumber("1")
console.log("orders: " + JSON.stringify(orders));

 }
};
  
const handleDeleteOrder = (index, orderType,orderNumber) => {
  // Update the orders array and remove the item at the specified index
  setOrders(prevOrders => {
    const updatedOrders = prevOrders.filter((_, i) => i !== index);
    // Save the updated orders to local storage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return updatedOrders;
  });

  // Calculate the product price based on the order type
  let productPrice = 0;
  if (orderType === "Tshirt") {
    productPrice = 39;
  } else if (orderType === "Hoodie") {
    productPrice = 65;
  } else {
    productPrice = 44; // Assuming this is the price for other items
  }

  console.log("order number to delete:" + orderNumber)
  // Update the total price and subtract the price of the deleted item
  setTotalPrice(prevTotalPrice => {
    const updatedTotalPrice = prevTotalPrice - (productPrice * orderNumber);
    // Save the updated total price to local storage
    localStorage.setItem('totalPrice', updatedTotalPrice.toString());
    return updatedTotalPrice;
  });

  // Decrement the cart count
  setCartCount(prevCount => prevCount - 1);
};


const handleAlertMessaage = () =>{
  setShowAlert(true);
  setTimeout(() => {
    setShowAlert(false);
  }, 3000); // Hide the alert after  3 seconds

}
  const handleOrder = () => {
    if (orders.length<1) {
      setAlertMessage("Please select an item before order")
     handleAlertMessaage()
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSaveOptions = (tshirtNumber, tshirtSize) => {


    //add an  confirmation alert here when the use acapet it will continue with the code under
    
    // Function to save user options
   /*  if (confirm("Do you want to proceed with saving the options?")) {
      setTshirtNumber(tshirtNumber)
      setTshirtSize(tshirtSize)
    } */
    setTshirtNumber(tshirtNumber)
    setTshirtSize(tshirtSize)
  }

  // Define a function to insert a customer and return the customer ID
  async function insertCustomer(name, email, phone,address,selectedRegion,selectedCity) {
    const customerData = {
      name,
      email,
      phone,
      address,
      selectedregion: selectedRegion, // Change property name to lowercase
      selectedcity:selectedCity
    };

    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([customerData])
        .select("*");
  
      if (error) {
        console.error('Error inserting customer:', error);
        setSubmitStatus('error');
        return null; // Return null to indicate failure
      }
  
      console.log("customerData: " + JSON.stringify(data));
  
      if (!data || data.length === 0) {
        console.error('No customer data returned after insert operation.');
        setSubmitStatus('error');
        return null; // Return null to indicate failure
      }
    
      // Return the customer ID
      return data[0].id;
    } catch (err) {
      console.error('Exception when inserting customer:', err);
      setSubmitStatus('error');
      return null; // Return null to indicate failure
    }
  }


  const handleSubmit = async (tshirtNumber, tshirtSize) => {
    // Extract customer details from formData
    const { name, email, phone,address } = formData;
  
    // Insert customer into the 'customers' table and get the customer ID
    const idCustomer = await insertCustomer(name, email, phone,address,selectedRegion,selectedCity);
    if (!idCustomer) {
      console.error('Error inserting customer:');
      setSubmitStatus('error');
      return;
    }
  
    // Map through each order in the orders array and add the customer data to them
    const ordersWithData = orders.map(order => ({
      customer_id: idCustomer,  // Use customer_id instead of customer_name
      type: order.type,
      color: order.color,
      size: order.size,
      ordernumber: order.ordernumber, // Assuming ordernumber is a property of the order object
      image: imageUrl // Assuming image is a property of the order object
    }));
  
    // Insert the orders with customer data into the 'orders' table
    const { data, error } = await supabase
      .from('orders')
      .insert(ordersWithData)
      .select("*");
  
    if (error) {
      console.error('Error inserting order:', error);
      setSubmitStatus('error');
    } else {
      console.log("data=" + data);
      setOpen(false);
      setSubmitStatus('success');
      // Redirect to success page
      const queryString = new URLSearchParams({ phone, name }).toString();

       //clear orders and totalPrice from localStorage
       localStorage.removeItem('orders');
       localStorage.removeItem('totalPrice');

      try {
        await router.push(`/order/success?${queryString}`);
        setIsLoading(true)
      } catch (err) {
        console.log("error" + err.message);
        console.log("Error in redirecting to success page");
      } finally {
        setIsLoading(false);
      }
    }
  };
  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colors":
        return <ColorPicker />
      case "filepicker":
        return <TshirtSizePicker tshirtNumber={tshirtNumber} tshirtSize={tshirtSize} handleSaveOptions={handleSaveOptions} />
      /* return <FilePicker
        file={file}
        setFile={setFile}
        readFile={readFile}
      /> */
      /*   case "aipicker":
          return <AIPicker 
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          /> */
      default:
        return null;
    }
  }



  const handleActiveTab = (tabName) => {
    if (activeEditorTab === tabName)
      setActiveEditorTab("")
    else {
      
      setActiveEditorTab(tabName)
    }

  }


  const handleDecals = (type, result) => {
    const decalType = DecalTypes["tshirt"];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }
 

    // TODO this should be the function to use to change the place of the image on the product
  const handleActiveTexture = (tabName) => {
    console.log("tabName: " + tabName);
    setActiveFilterTexture((prevState) => {
      // Create a copy of the previous state
      const newState = { ...prevState };

      // Set all keys to false
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });

      // Set the clicked tab to true
      newState[tabName] = true;
      
      // Update the global state based on the active filter tab
      state.isLogoTexture = tabName === 'logoShirt';
      state.isFullTexture = tabName === 'logoFrame';

      return newState;
    });
  };

  const handleActiveFilterTab = (tabName) => {
    console.log("tabName: " + tabName);
    state["type"] = tabName
   setActiveFilterTab(tabName);
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }


  return (
    <AnimatePresence >

      <>
        {/* {isLoading ? (
        <motion.div 
          className="flex items-center justify-center h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/img/logo.webp" alt="Loading..." width={100} height={100} />
        </motion.div>):null} */}

  

   <motion.div
          key="custom"
          className="absolute bottom-10 left-0 z-50  " // Added mt-4 for margin-top
          {...slideAnimation('left')}
        >
          <div className="flex items-center  p-20 mb-10">
            <div className="editortabs-container tabs">
             
             
              {
                activeFilterTab !== 'Frame' && EditorTabs.map((tab) => (
                  <>
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => handleActiveTab(tab.name)}
                    />
                    {/* <p>{tab.name}</p> */}
                  </>
                ))
              }
              <img
              className=''
                src={"/images/add-to-cart.png"}
        alt={"icon"}
          onClick={() => handleAddToCart()}

      />    {generateTabContent()}
            </div>
            
          </div>
        </motion.div>  
        
                                        {/*   <CustomButton
                                          type="filled"
                                          title=  {isMobile ? "➕" :"➕ Add to cart" }
                                          
                                          customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                                          onMouseOver={(e) => {
                                            const tooltip = document.createElement("div");
                                            tooltip.textContent = "Add to cart";
                                            tooltip.style.position = "absolute";
                                            tooltip.style.top = `${e.clientY + 5}px`;
                                            tooltip.style.left = `${e.clientX + 5}px`;
                                            tooltip.style.background = "white";
                                            tooltip.style.border = "1px solid black";
                                            tooltip.style.padding = "4px";
                                            document.body.appendChild(tooltip);

                                            const removeTooltip = () => {
                                              document.body.removeChild(tooltip);
                                            };

                                            e.currentTarget.addEventListener('mouseleave', removeTooltip, { once: true });
                                          }}
                                        /> */}
             
 



        <motion.div
  key={"custom1"}
  className="absolute z-20 top-0 right-0 mt-4 md:p-5"
  {...fadeAnimation}
>
  <CustomButton
    type="filled"
    title={`🛒  My cart (${cartCount})`}
    handleClick={handleOpenCartCart}
    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
  />
{/*                                          <motion.div
  key={"custom"}
  className={`${isMobile ? "info-container-bottom hidden":"info-container-top"}`}
  {...fadeAnimation}
> */}
    {/* <i className="info-icon " title="The final result may be different"><span className='bg-red-400 p-1 rounded-full w-fit h-fit'>i</span></i> */}

    {/* <span className="info-text text-xs z-50">The final result may be little different</span> */}


</motion.div>
        <motion.div
          key={"custom2"}
          className="absolute z-20  bottom-10 right-0 md:right-10  "
          {...fadeAnimation}
        >

          <CustomButton
            type="filled"
            title="Order Now"

            handleClick={handleOrder}
            customStyles="w-fit  px-2 md:px-4  py-2.5  font-bold text-sm mb-4 sm:mb-2"
          />
        </motion.div>
        {showAlert && (
          <motion.div
          key={"custom3"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
          >
            <div className="bg-red-500 text-white p-4 rounded shadow-lg">
             {alertMessage}
            </div>
          </motion.div>
        )}
        <motion.div
        key={"custome4"}
          className='filtertabs-container mb-4 md:mb-0'
          {...slideAnimation("up")}
        >
          {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}
            />
          ))}
        </motion.div>

        <motion.div
        key={"custom5"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute z-20 top-0 left-0 mt-4"
          >
            <div className="bg-red-500 text-white p-4 rounded shadow-lg">
           {activeFilterTab === "Tshirt" ? "TND 39" : (activeFilterTab === 'Hoodie') ? "TND 65": "TND 44"}
            </div>
            <small style={{color: 'red'}}>Free </small><small>shipping</small>
          </motion.div>
        
        <motion.div/>



        <div >

          <Dialog open={open} onClose={handleCloseCart}>
            <DialogTitle>Enter your details</DialogTitle>
                        <DialogContent>
                          <small>the order may take between 2 to 4 working days</small>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name  *"
                type="text"
                fullWidth
                helperText={"name is required"}
                variant="standard"
                value={formData.name}
                onChange={handleChange}
                error={!formData.name.trim()}
              // helperText={!formData.name.trim() ? "Name is required" : ""}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address   *"
                type="text"
                fullWidth
                variant="standard"
                value={formData.address}
                onChange={handleChange}
                error={!formData.address.trim()}
                // helperText={!formData.address.trim() ? "Address is required" : ""}
                helperText={"address is required"}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={formData.email}
                onChange={handleChange}
              // onBlur={() => setTouched({...touched, email: true})} error={touched.email && !/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(formData.email)} helperText={touched.email && !/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(formData.email) ? "Invalid email address" : ""}


              />

              <TextField
                margin="dense"
                name="phone"
                label="Phone Number  *"
                type="text"
                fullWidth
                variant="standard"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, phone: true })}
                error={touched.phone && !/^(2|4|5|9|46)\d{7}$/.test(formData.phone)}

                // helperText={touched.email && !/^\d{8}$/.test(formData.phone)? "Invalid phone number" : ""}
                helperText={"phone is required"}
              />
              <DependentSelectExample selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} selectedCity={selectedCity} setSelectedCity={setSelectedCity} handleCityChange={handleCityChange}/>

              <FormControlLabel
      control={
        <Checkbox
          checked={formData.termsAccepted}
          onChange={(event) => setFormData({ ...formData, termsAccepted: event.target.checked })}
          name="termsAccepted"
          color="primary"
        />
      }
      label={
        <span>
          I accept the{' '}
          <Link href="/order/policy" target="_blank" rel="noopener noreferrer">
            terms and conditions
          </Link>
        </span>
      }
    />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={()=>{handleSubmit(tshirtNumber,tshirtSize)}} disabled={!formData.name.trim() ||
                !formData.address.trim()
                //  (touched.email && !/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(formData.email)) 
                || !/^(2|4|5|9|46)\d{7}$/.test(formData.phone)
                || selectedRegion == 1 ||
        !formData.termsAccepted
        }

              >Submit</Button>
            </DialogActions>
          </Dialog> 
        </div>

     <div >
     <div className={`${openCart ? 'flex' : 'hidden'} fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="relative w-full p-5 max-w-md m-auto bg-white rounded-lg shadow-lg overflow-hidden mx-4 md:mx-0">
    <div className="px-6 py-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4" id="modal-title">
          Your Cart
        </h3>
        {orders.length <= 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <ul className="text-left space-y-3">
            {orders.map((order, index) => (
              <li key={index} className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="text-sm font-medium text-gray-700">{`Order #${index + 1}`}</span>
                <span className="text-sm text-gray-500">{`${order.type} - ${order.size} - ${order.ordernumber}`}</span>
                <button onClick={() => handleDeleteOrder(index,order.type,order.ordernumber)} className="flex items-center text-red-600 hover:text-red-800 transition duration-150 ease-in-out">
  <svg className="mr-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
  Delete
</button>
              </li>
            ))}
          </ul>
        )}
        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'TND' }).format(totalPrice)}</p>
      </div>
    </div>
    <div className="px-6 py-3 bg-gray-100 text-right">
      <button type="button" className="py-2 px-4 bg-red-600 text-white w-full font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150" onClick={handleCloseCart}>
        Close
      </button>
    </div>
  </div>
</div>



</div>





      </>

    </AnimatePresence>
  )
}

export default Customizer