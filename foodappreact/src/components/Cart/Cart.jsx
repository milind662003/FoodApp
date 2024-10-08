import { Divider, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard'
import { Button, Card } from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../State/Order/Action'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};
const initialValues = {
  streetAddress:"",
  state:"",
  pincode:"",
  city:""
}



const Cart = () => {
  const createOrderUsingSelectedAddress = () => {

  }
  const {cart, auth} = useSelector(store=>store)
  const handleOpenAddressModel = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const handleSubmit = (values) => {
    const data = {
        jwt:localStorage.getItem("jwt"),
        order:{
          restaurantId:cart.cartItems[0].food?.restaurant.id,
          deliveryAddress:{
            fullName:auth.user?.fullName,
            streetAddress:values.streetAddress,
            city:values.city,
            state:values.state,
            country:"India"          
          }
        }
    }
    dispatch(createOrder(data))
    console.log("form value", values)
  }
  return (
    auth.user? (<div>
      <main className="lg:flex justify-between">
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
            {cart.cartItems.map((item) => <CartItem item={item}/>)}
       <Divider/>
       <div className="billDetails px-5 text-sm">
            <p className='font-extralight py-5'>Bill Details</p>
            <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                    <p>Item Total</p>
                    <p>₹{cart.cart?.total}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                    <p>Delivery Fee</p>
                    <p>₹23</p>
                </div>
                <div className="flex justify-between text-gray-400">
                    <p>GST and Restaurant Charges</p>
                    <p>₹13</p>
                </div>
                <Divider/>
            </div>
            <div className="flex justify-between text-gray-400">
                    <p>Total Bill</p>
                    <p>₹{cart.cart?.total + 23 + 13}</p>
                </div>
        </div>
        </section>
        <Divider orientation='vertical' flexItem/>
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
            <div>
                <h1 className="text-center font-semibold text-2xl py-10">Choose Delivery Address</h1>
                <div className="flex gap-5 flex-wrap justify-center">
                  {[1,1,1,1,1].map((item) => <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />)}
                  <Card className="flex gap-5 w-64 p-5 ">
      <AddLocationAltIcon/>
      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">Add New Address</h1>
        <Button variant="outlined" fullWidth onClick={handleOpenAddressModel}>Add</Button>
      </div>
     
    </Card>
                </div>
                
            </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik initialValues={initialValues}
          onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2}>
              <Grid item xs = {12}>
                <Field
                as={TextField}
                name="streedAddress"
                label="Street Address"
                fullWidth
                variant="outlined"
                />
              </Grid>
              <Grid item xs = {12}>
                <Field
                as={TextField}
                name="state"
                label="State"
                fullWidth
                variant="outlined"
                />
              </Grid>
              <Grid item xs = {12}>
                <Field
                as={TextField}
                name="city"
                label="City"
                fullWidth
                variant="outlined"
                />
              </Grid>
              <Grid item xs = {12}>
                <Field
                as={TextField}
                name="pincode"
                label="Pincode"
                fullWidth
                variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
              <Button variant='contained' type='submit' color='primary' fullWidth>Save Address</Button>
              </Grid>
            </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>) : (<div className="flex items-center flex-col justify-center min-h-screen text-gray-300">
      <RemoveShoppingCartIcon sx={{fontSize:"10rem"}}/>      
    </div>)
  )
}

export default Cart
