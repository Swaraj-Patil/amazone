import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAllAddresses } from '../../redux/actions/addressActions'
import { toast } from 'react-toastify'
import { Loader } from '../Layout'

const CheckoutAddress = () => {
    const dispatch = useDispatch()
    const { addresses, error: addressError, loading } = useSelector(state => state.allAddresses)

    useEffect(() => {
        if (addressError) {
          toast.error(addressError)
          dispatch(clearErrors())
        }
    
        dispatch(getAllAddresses())
      }, [dispatch, addressError])

    return (
        <>
            { loading ? <Loader /> :
                <div className='checkout__address'>
                    <div></div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Your Addresses
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {
                                    addresses && addresses.map(address => <li key={address._id}>
                                        <input type="radio" name="" id="" />
                                        <p>
                                            <span>{address?.name}</span>
                                            <span>{`${address?.addressLine}, ${address?.area}, ${address?.city?.toUpperCase()}, ${address?.state?.toUpperCase()}, ${address?.pincode}, ${address?.country}`}</span>
                                            <span>Edit address</span>
                                            |
                                            <span>Add delivery instructions</span>
                                        </p>
                                    </li>)
                                }
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>
            }
        </>
    )
}

export default CheckoutAddress