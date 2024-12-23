import { Add, CheckCircle, Close, ExpandMore, KeyboardArrowDown } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Tooltip } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createAddress, deleteAddress, fetchCountries, fetchStatesOfCountry, getAllAddresses } from '../../redux/actions/addressActions'
import { toast } from 'react-toastify'
import { Loader } from '../Layout'
import Input from '../../utils/Input'
import TextArea from '../../utils/TextArea'
import Dropdown from '../../utils/Dropdown'
import { ALL_COUNTRIES_SUCCESS, CREATE_ADDRESS_RESET, DELETE_ADDRESS_RESET } from '../../redux/constants/addressConstants'
import Button from '../../utils/Button'
import RadioGroup from '../../utils/RadioGroup'
import LineBreak from '../../utils/LineBreak'
import amazonPayICICI from '../../assets/amazon-pay-icici.png'
import masterCard from '../../assets/mastercard.png'
import bajajFinserv from '../../assets/bajaj-finserv.png'
import visa from '../../assets/visa.png'
import americanExpress from '../../assets/american-express.png'
import rupay from '../../assets/rupay.png'
import { upiRegex } from '../../utils/constants'
import { fulfilled, primeIcon } from '../../assets'

const months = [
    {
        id: 1,
        value: 1
    },
    {
        id: 2,
        value: 2
    },
    {
        id: 3,
        value: 3
    },
    {
        id: 4,
        value: 4
    },
    {
        id: 5,
        value: 5
    },
    {
        id: 6,
        value: 6
    },
    {
        id: 7,
        value: 7
    },
    {
        id: 8,
        value: 8
    },
    {
        id: 9,
        value: 9
    },
    {
        id: 10,
        value: 10
    },
    {
        id: 11,
        value: 11
    },
    {
        id: 12,
        value: 12
    },
]

const years = [
    {
        id: 1,
        value: 2024
    },
    {
        id: 2,
        value: 2025
    },
    {
        id: 3,
        value: 2026
    },
    {
        id: 4,
        value: 2027
    },
    {
        id: 5,
        value: 2028
    },
    {
        id: 6,
        value: 2029
    },
    {
        id: 7,
        value: 2030
    },
    {
        id: 8,
        value: 2031
    },
    {
        id: 9,
        value: 2032
    },
    {
        id: 10,
        value: 2033
    },
    {
        id: 11,
        value: 2034
    },
]

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    p: 0,
    width: '517px',
    borderRadius: '10px',
    outline: 'none',
    overflow: 'hidden',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column'
};

const initialState = {
    id: null,
    name: "",
    iso2: ""
}

const initialCountry = {
    id: 101,
    name: "India",
    iso2: "IN",
    iso3: "IND",
    phonecode: "91",
    capital: "New Delhi",
    currency: "INR",
    native: "भारत",
    emoji: "🇮🇳"
}

const initialAddress = {
    country: initialCountry,
    name: '',
    mobile: '',
    pincode: '',
    addressLine: '',
    area: '',
    landmark: '',
    city: '',
    state: initialState,
    defaultAddress: false,
    deliveryInstructions: '',
}

const initialCard = {
    number: '',
    name: '',
    month: { id: 1, value: 1 },
    year: { id: 1, value: 2024 },
}

const payments = [
    {
        id: 1,
        cardName: 'Amazone Pay ICICI Bank Credit Card',
        lastDigits: 9007,
        image: amazonPayICICI,
        name: 'Swaraj Patil'
    },
    {
        id: 2,
        cardName: 'SBI Credit Card',
        lastDigits: 8884,
        image: masterCard,
        name: 'Ramay Saina'
    },
    {
        id: 3,
        cardName: 'Amazone Pay ICICI Bank Credit Card',
        lastDigits: 8009,
        image: amazonPayICICI,
        name: 'Seknath Inde'
    },
    {
        id: 4,
        cardName: 'Bajaj Finserv',
        lastDigits: 4654,
        image: bajajFinserv,
        name: 'Basprith Jumrah'
    },
    {
        id: 5,
        cardName: 'HDFC Bank Credit Card',
        lastDigits: 1303,
        image: visa,
        name: 'Paraj Swatil'
    },
]

const banks = [
    {
        id: 1,
        name: 'Airtel Payments Bank'
    },
    {
        id: 2,
        name: 'Axis Bank'
    },
    {
        id: 3,
        name: 'HDFC Bank'
    },
    {
        id: 4,
        name: 'ICICI Bank'
    },
    {
        id: 5,
        name: 'Kotak Bank'
    },
    {
        id: 6,
        name: 'State Bank of India'
    },
    {
        id: 7,
        name: 'Bank of Maharashtra'
    },
    {
        id: 8,
        name: 'Canara Bank'
    },
    {
        id: 9,
        name: 'IDBI Bank'
    },
    {
        id: 10,
        name: 'IndusInd Bank'
    },
    {
        id: 11,
        name: 'Punjab National Bank'
    },
    {
        id: 12,
        name: 'Union Bank of India'
    },
]

const CheckoutAddress = () => {
    const dispatch = useDispatch()
    const { addresses, error: addressError, loading } = useSelector(state => state.allAddresses)
    const { countries } = useSelector(state => state.countries)
    const { states } = useSelector(state => state.states)
    const { loading: createAddLoader, error: createAddError, success } = useSelector(state => state.createAddress)
    const { isDeleted } = useSelector(state => state.address)

    const [addressModal, setAddressModal] = useState(false)
    const [cardModal, setCardModal] = useState(false)
    const [addressForm, setAddressForm] = useState(initialAddress)
    const [cardForm, setCardForm] = useState(initialCard)
    const [instructions, setInstructions] = useState(false)
    const [formValid, setFormValid] = useState(false)
    const [accordionExpanded, setAccordionExpanded] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState('')
    const [selectedPayment, setSelectedPayment] = useState(0)
    const [selectedBank, setSelectedBank] = useState({ id: null, name: '' })
    const [upi, setUpi] = useState('')
    const [paymentValid, setPaymentValid] = useState(false)
    const [isUpiVerified, setIsUpiVerified] = useState(false)

    const AddressCard = ({ address }) => (
        <li>
            <div>
                <span style={{ fontWeight: 700 }}>{address?.name}</span>
                <span>{`${address?.addressLine}, ${address?.area}, ${address?.city?.toUpperCase()}, ${address?.state?.toUpperCase()}, ${address?.pincode}, ${address?.country}`}</span>
                <span>Phone number: {address.mobile}</span>
                <div style={{ marginTop: '4px' }}>
                    <span
                        style={{ color: '#007185', cursor: 'pointer' }}
                        onClick={() => handleAddressEdit(address)}
                    >Edit address</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span
                        style={{ color: '#007185', cursor: 'pointer' }}
                        onClick={() => handleAddressDelete(address._id)}
                    >Delete address</span>
                </div>
            </div>

        </li>
    )

    const PaymentCard = ({ payment }) => {
        const [cvvs, setCvvs] = useState({})

        const handleCvvChange = useCallback((newValue, cardId) => {
            setCvvs(prev => ({
                ...prev,
                [cardId]: newValue
            }))

            // dispatch(setCVV(newValue))
        }, [])

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '40px' }}>
                    <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                        <p><span style={{ fontWeight: 700 }}>{payment.cardName}</span> ending in {payment.lastDigits}</p>
                        <img src={payment.image} alt="card" height={25} />
                    </div>
                    <p>{payment.name}</p>
                </div>
                {selectedPayment === payment.id && <div style={{ width: '80px', display: 'flex', alignItems: 'center' }}>
                    <p style={{ color: '#565959', fontSize: '12px' }}>CVV</p>
                    <Input
                        inputProps={{
                            id: `cvv-${payment.id}`,
                            name: `cvv-${payment.id}`,
                            type: 'number'
                        }}
                        value={cvvs[payment.id] || ''}
                        onChange={newValue => newValue.length < 4 && handleCvvChange(newValue, payment.id)}
                    />
                </div>}
            </div>
        )
    }

    const creditCards = [amazonPayICICI, masterCard, rupay, visa, bajajFinserv, americanExpress]
    const DisplayCards = () => <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', margin: '10px 0 10px 20px' }}>{creditCards.map((card, index) => <img height={25} key={index} src={card} alt={index} />)}</div>

    const handleAddressModalOpen = () => {
        setAddressModal(true)
    }

    const handleAddressFormChange = (value, field) => {
        setAddressForm(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    const handleCardFormChange = (field, value) => {
        setCardForm(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    const handleAddressSubmit = (event) => {
        event.preventDefault()
        dispatch(createAddress({
            ...addressForm,
            country: addressForm.country.name,
            state: addressForm.state.name
        }))
    }

    const handleCardSubmit = () => {
        setCardModal(false)
        payments.push({
            id: payments.length + 1,
            cardName: 'Special Access Debit Card',
            lastDigits: cardForm.number.slice(-4),
            image: visa,
            name: cardForm.name
        })
        setSelectedPayment(2)
    }

    const handleAddressChange = address => {
        setSelectedAddress(address)
    }

    const handlePaymentChange = payment => {
        setSelectedPayment(payment)
    }

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setAccordionExpanded(isExpanded ? panel : false)
    }

    const handleAddressSelection = () => {
        setAccordionExpanded(('payment'))
    }

    const handleAddressEdit = address => { }

    const handleAddressDelete = addressId => {
        dispatch(deleteAddress(addressId))
            .then(() => {
                dispatch(getAllAddresses())
            })
            .catch(() => toast.error('Error deleting address'))

    }

    const validateCardForm = () => {
        const { number, name } = cardForm
        return number > 999 && name.length > 0 ? false : true
    }

    useEffect(() => {
        if (
            addressForm.country.iso2 &&
            addressForm.name &&
            addressForm.mobile.length === 10 &&
            addressForm.pincode &&
            addressForm.addressLine &&
            addressForm.area &&
            addressForm.city.length > 0 &&
            addressForm.state.iso2
        ) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [addressForm])

    useEffect(() => {
        if (addressError) {
            toast.error(addressError)
            dispatch(clearErrors())
        }

        dispatch(getAllAddresses())
    }, [dispatch, addressError])

    useEffect(() => {
        if (addressModal) {
            setAddressForm(prevState => ({
                ...prevState,
                country: initialCountry
            }))
            const _countries = JSON.parse(localStorage.getItem('countries'))
            if (_countries) {
                dispatch({
                    type: ALL_COUNTRIES_SUCCESS,
                    payload: _countries,
                });
            } else {
                dispatch(fetchCountries())
            }
        }
    }, [dispatch, addressModal])

    useEffect(() => {
        if (addressModal) {
            setAddressForm(prevState => ({
                ...prevState,
                state: initialState
            }))
            dispatch(fetchStatesOfCountry(addressForm.country.iso2))
        }
    }, [addressForm.country, addressModal, dispatch])

    useEffect(() => {

        if (createAddError) {
            toast.error(createAddError)
        }

        if (success) {
            toast.success('Address added successfully')
            dispatch({ type: CREATE_ADDRESS_RESET })
            setAddressModal(false)
            setAddressForm(initialAddress)
            dispatch(getAllAddresses())
        }

        if (isDeleted) {
            toast.success('Address deleted successfully')
            dispatch({ type: DELETE_ADDRESS_RESET })
        }
    }, [success, createAddError, isDeleted, dispatch])

    useEffect(() => {
        if (addresses.length > 0) {
            setSelectedAddress(addresses[0]._id)
        }
    }, [addresses])

    useEffect(() => {
        if (selectedPayment === 6 && payments.length === 6) {
            setPaymentValid(true)
        } else if (selectedPayment === 8) {
            setPaymentValid(true)
        } else if (selectedPayment === 9 && upiRegex.test(upi) && isUpiVerified) {
            setPaymentValid(true)
        } else if (selectedPayment === 11) {
            setPaymentValid(true)
        } else {
            setPaymentValid(false)
        }
    }, [selectedPayment, upi, isUpiVerified])

    useEffect(() => {
        cardModal && setCardForm(initialCard)
    }, [cardModal])

    return (
        <>
            {(loading || createAddLoader) ? <Loader /> :
                <div className='checkout__address'>
                    <p className='checkout__titles'>Select a delivery address</p>
                    <Accordion expanded={accordionExpanded === 'address'} onChange={handleAccordionChange('address')}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Your Addresses</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <ul className='address__list'>
                                    <RadioGroup
                                        inputProps={{
                                            name: "address"
                                        }}
                                        options={addresses?.map(address => ({
                                            label: <AddressCard key={address._id} address={address} />,
                                            value: address._id
                                        }))}
                                        value={selectedAddress}
                                        onChange={handleAddressChange}
                                        defaultValue={selectedAddress}
                                    />
                                    <li>
                                        <div
                                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#007185', cursor: 'pointer', marginTop: '10px' }}
                                            onClick={handleAddressModalOpen}
                                        >
                                            <span style={{ color: 'grey', marginRight: '6px' }}><Add /></span>
                                            <span>Add a new address</span>
                                        </div>
                                    </li>
                                </ul>
                                <div style={{ width: 'max-content', marginTop: '16px' }}>
                                    <Button
                                        onClick={handleAddressSelection}
                                        label='Deliver to this address'
                                        disabled={!selectedAddress}
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <p className='checkout__titles' style={{ marginTop: '25px' }}>Payment method</p>
                    <Accordion expanded={accordionExpanded === 'payment'} onChange={handleAccordionChange('payment')}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Your available balance</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <p style={{ fontSize: '18px', fontWeight: 700 }}>CREDIT & DEBIT CARDS</p>
                                <LineBreak marginTop='20px' marginBottom='20px' />

                                <ul className='payment__list'>
                                    <div style={{ width: '100%' }}>
                                        <RadioGroup
                                            inputProps={{
                                                name: "payment"
                                            }}
                                            options={payments?.map((payment, index) => ({
                                                label: <PaymentCard key={payment.id} payment={payment} />,
                                                value: payment.id
                                            }))}
                                            value={selectedPayment}
                                            onChange={handlePaymentChange}
                                        // defaultValue={selectedPayment}
                                        />
                                    </div>
                                </ul>
                            </div>
                            <div>
                                <p style={{ fontSize: '18px', fontWeight: 700, marginTop: '20px' }}>Another payment method</p>
                                <LineBreak marginTop='5px' marginBottom='20px' />

                                <div style={{ marginLeft: '40px' }}>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="radio"
                                            name="add-card"
                                            id="add-card"
                                            value={7}
                                            onChange={e => setSelectedPayment(parseInt(e.target.value))}
                                            checked={selectedPayment === 7}
                                            className='custom__radio'
                                        />
                                        <label htmlFor="add-card" style={{ marginLeft: '10px', cursor: 'pointer' }}>Credit or debit card</label>
                                    </div>

                                    <DisplayCards />

                                    {selectedPayment === 7 && payments.length < 6 && <div style={{ width: 'max-content' }}>
                                        <Button label='Add a new card' onClick={() => setCardModal(true)} />
                                    </div>}

                                    <div style={{ marginTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <input
                                                type="radio"
                                                name="netbanking"
                                                id="netbanking"
                                                value={8}
                                                onChange={e => setSelectedPayment(parseInt(e.target.value))}
                                                checked={selectedPayment === 8}
                                                className='custom__radio'
                                            />
                                            <label htmlFor="netbanking" style={{ marginLeft: '10px', cursor: 'pointer' }}>Net Banking</label>
                                        </div>

                                        {selectedPayment === 8 && <div style={{ width: 'max-content' }}>
                                            <Dropdown
                                                label=''
                                                inputProps={{
                                                    id: 'bank',
                                                    name: 'bank',
                                                    placeholder: 'Choose an Option'
                                                }}
                                                value={selectedBank}
                                                valueKey='id'
                                                onChange={newValue => setSelectedBank(newValue)}
                                            >
                                                {banks.map(bank =>
                                                    <option
                                                        key={bank.id}
                                                        value={bank.id}
                                                        data={bank}
                                                    >{bank.name}</option>
                                                )}
                                            </Dropdown>
                                        </div>}
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <input
                                                type="radio"
                                                name="upi"
                                                id="upi"
                                                value={9}
                                                onChange={e => setSelectedPayment(parseInt(e.target.value))}
                                                checked={selectedPayment === 9}
                                                className='custom__radio'
                                            />
                                            <label htmlFor="upi" style={{ marginLeft: '10px', cursor: 'pointer' }}>Other UPI Apps</label>
                                        </div>

                                        {selectedPayment === 9 && (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: 'max-content' }}>
                                                    <div>
                                                        <Input
                                                            label='Please enter your UPI ID'
                                                            inputProps={{
                                                                id: 'UPI',
                                                                name: 'UPI',
                                                                placeholder: 'Enter UPI ID'
                                                            }}
                                                            value={upi}
                                                            onChange={(newValue) => {
                                                                setUpi(newValue)
                                                                setIsUpiVerified(false)
                                                            }}
                                                        />
                                                        {upiRegex.test(upi) && isUpiVerified && <p style={{ color: '#067d62', fontSize: '12px', margin: '5px 0 0 12px', display: 'flex', alignItems: 'center', columnGap: '5px' }}><CheckCircle /> Verified!</p>}

                                                    </div>
                                                    <div style={{ marginLeft: '30px', position: 'absolute', left: '100%', top: '22px' }}>
                                                        <Button
                                                            label='Verify'
                                                            disabled={!upiRegex.test(upi)}
                                                            onClick={() => setIsUpiVerified(true)}
                                                        />
                                                    </div>
                                                </div>
                                                <p style={{ fontSize: '14px', margin: '10px 0 0 10px' }}>The UPI ID is in the format of name/phone number@bankname</p>
                                            </>
                                        )}
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <input
                                                type="radio"
                                                name="emi"
                                                id="emi"
                                                value={10}
                                                onChange={e => setSelectedPayment(parseInt(e.target.value))}
                                                checked={selectedPayment === 10}
                                                className='custom__radio'
                                                disabled
                                            />
                                            <label htmlFor="emi" style={{ marginLeft: '10px', color: '#777' }}>EMI Unavailable <span style={{ color: '#007185', cursor: 'pointer' }}><Tooltip title="EMI is not available on purchase of Gold, Jewelry, Gift cards, Amazon Pay balance top up or digital content">Why?</Tooltip></span></label>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <input
                                                type="radio"
                                                name="cod"
                                                id="cod"
                                                value={11}
                                                onChange={e => setSelectedPayment(parseInt(e.target.value))}
                                                checked={selectedPayment === 11}
                                                className='custom__radio'
                                            />
                                            <label htmlFor="cod" style={{ marginLeft: '10px', cursor: 'pointer' }}>Cash on Delivery/Pay on Delivery</label>
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#008a00', marginLeft: '20px' }}>Scan & Pay at delivery with Amazon Pay UPI and get cashback up to ₹10. <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ox_pay_page_cod_notavail_why?nodeId=G202054820&ie=UTF8&ref_=ox_pay_page_cod_notavail_why' target='_blank' rel="noopener noreferrer" className='app__link'>Know more.</a></p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ width: 'max-content', marginTop: '20px' }}>
                                <Button
                                    label='Use this payment method'
                                    disabled={!paymentValid}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <p className='checkout__titles' style={{ marginTop: '25px' }}>Review Order</p>
                    <Accordion expanded={accordionExpanded === 'review'} onChange={handleAccordionChange('review')}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Arriving 25 Dec 2024</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <p style={{ fontSize: '14px' }}>If you order in the next 15 minutes <a href='https://www.amazon.in/gp/help/customer/display.html?nodeId=GRK3YG3G4Y3R4LWJ' target='_blank' rel="noopener noreferrer" className='app__link'>Details</a></p>

                                <div style={{
                                    backgroundColor: '#F7F7F7',
                                    border: '.1rem solid #F7F7F7',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    padding: '18px',
                                    display: 'flex',
                                    columnGap: '10px'
                                }}>
                                    <div style={{}}>
                                        <img width={150} src="https://m.media-amazon.com/images/I/61vihvwHdBL._AC_AA150_.jpg" alt="product" />
                                    </div>

                                    <div>
                                        <p>One94Store 3D Deer Crystal Globe Lamp Creative Engraved Crystal Ball Night Light USB Table LED Wooden Crystal Ball for Home Office Decoration Birthday Gift Adults (Deer 6cm)(Warm White)</p>
                                        <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', columnGap: '6px', margin: '6px 0' }}>
                                            <p style={{ backgroundColor: '#CC0C39', padding: '4px 6px', borderRadius: '2px', color: 'white' }}>60% off</p>
                                            <p style={{ color: '#CC0C39', fontWeight: 700 }}>Limited time deal</p>
                                        </div>
                                        <p style={{ fontWeight: 700 }}>₹299.00</p>
                                        <img src={primeIcon} alt="prime" width={50} />
                                        <p style={{ fontSize: '12px', display: 'flex', alignItems: 'center', columnGap: '10px' }}>Ships from Amazon <span><img src={fulfilled} alt="fulfilled" /></span></p>
                                        <p style={{ fontSize: '12px' }}>Sold by <a href="https://www.amazon.in/sp?marketplaceID=A21TJRUUN4KGV&seller=A1V7ZM32AEQ8C" target='_blank' rel="noopener noreferrer" className='app__link'>X4Cart</a></p>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div >
            }

            <Modal
                open={addressModal}
                onClose={() => setAddressModal(false)}
                aria-labelledby="address-modal-title"
                aria-describedby="address-modal-description"
            >
                <Box sx={modalStyles}>
                    <div className='address__add-modal_1'>
                        <h4>Enter a new delivery address</h4>
                        <Close style={{ cursor: 'pointer' }} onClick={() => setAddressModal(false)} />
                    </div>
                    <div className='address__add-modal_2'>
                        <h2>Add a new address</h2>

                        <form style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', marginTop: '10px' }}>
                            <div style={{ width: '450px' }}>
                                <Dropdown
                                    label='Country/Region'
                                    inputProps={{
                                        id: 'country',
                                        name: 'country',
                                    }}
                                    value={addressForm.country}
                                    valueKey='iso2'
                                    displayKey='name'
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                >
                                    {countries && countries.map(country =>
                                        <option
                                            key={country.id}
                                            value={country.iso2}
                                            data={country}
                                        >{country.name}</option>
                                    )}
                                </Dropdown>
                            </div>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Full name (First and Last name)'
                                    inputProps={{
                                        id: 'name',
                                        name: 'name',
                                    }}
                                    value={addressForm.name}
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                />
                            </div>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Mobile number'
                                    inputProps={{
                                        id: 'mobile',
                                        name: 'mobile',
                                        type: 'number'
                                    }}
                                    value={addressForm.mobile}
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                />
                                <p style={{ fontSize: '12px', lineHeight: '16px', margin: '6px 0 0 10px' }}>May be used to assist delivery</p>
                            </div>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Pincode'
                                    inputProps={{
                                        id: 'pincode',
                                        name: 'pincode',
                                        placeholder: '6 digits [0-9] PIN code',
                                        type: 'number'
                                    }}
                                    value={addressForm.pincode}
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                />
                            </div>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Flat, House no., Building, Company, Apartment'
                                    inputProps={{
                                        id: 'addressLine',
                                        name: 'addressLine',
                                    }}
                                    value={addressForm.addressLine}
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                />
                            </div>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Area, Street, Sector, Village'
                                    inputProps={{
                                        id: 'area',
                                        name: 'area',
                                    }}
                                    value={addressForm.area}
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                />
                            </div>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Landmark'
                                    inputProps={{
                                        id: 'landmark',
                                        name: 'landmark',
                                        placeholder: 'E.g. Near apollo hospital'
                                    }}
                                    value={addressForm.landmark}
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                />
                            </div>
                            <div style={{ width: '450px', display: 'flex', alignItems: 'center' }}>
                                <Input
                                    label='Town/City'
                                    inputProps={{
                                        id: 'city',
                                        name: 'city',
                                    }}
                                    value={addressForm.city}
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                />
                                <Dropdown
                                    label='State'
                                    inputProps={{
                                        id: 'state',
                                        name: 'state',
                                        placeholder: 'Choose a State'
                                    }}
                                    value={addressForm.state}
                                    valueKey='iso2'
                                    displayKey='name'
                                    onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                >
                                    {states && states.map(item =>
                                        <option
                                            key={item.id}
                                            value={item.iso2}
                                            data={item}
                                        >{item.name}</option>
                                    )}
                                </Dropdown>
                            </div>

                            <div style={{ display: 'flex', columnGap: '5px', padding: '0 10px', fontSize: '14px', lineHeight: '20px' }}>
                                <input type="checkbox" name="defaultAddress" id="defaultAddress" value={addressForm.defaultAddress} onChange={(event) => handleAddressFormChange(event.target.checked, 'defaultAddress')} />
                                <label htmlFor="defaultAddress">Make this my default address</label>
                            </div>

                            <div style={{
                                fontSize: '14px',
                                fontWeight: 600,
                            }}>
                                <p style={{ paddingLeft: '10px' }}>Delivery instructions (optional)</p>
                                <p
                                    className='address__add-instructions'
                                    style={{ paddingLeft: '10px', width: 'max-content' }}
                                    onClick={() => setInstructions(prevState => !prevState)}
                                >Add preferences, notes, access codes and more <span className='app__center'><KeyboardArrowDown style={{ rotate: instructions ? '180deg' : '' }} /></span></p>

                                {instructions &&
                                    <div style={{ width: '450px' }}>
                                        <TextArea
                                            inputProps={{
                                                id: 'deliveryInstructions',
                                                name: 'deliveryInstructions',
                                                placeholder: 'Provide details such as building description, a nearby landmark, or other navigation instructions.'
                                            }}
                                            value={addressForm.deliveryInstructions}
                                            onChange={(newValue, field) => handleAddressFormChange(newValue, field)}
                                        />
                                        <p style={{ padding: '5px 0 0 10px', color: '#565959', fontSize: '12px', fontStyle: 'italic' }}>Your instructions help us deliver your packages to your expectations and will be used when possible.</p>
                                    </div>}
                            </div>

                            <div>
                                <Button
                                    onClick={handleAddressSubmit}
                                    disabled={!formValid}
                                    label='Use this address'
                                />
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={cardModal}
                onClose={() => setCardModal(false)}
                aria-labelledby="card-modal-title"
                aria-describedby="card-modal-description"
            >
                <Box sx={{ ...modalStyles, width: '60vw', height: 'max-content' }}>
                    <div className='address__add-modal_1'>
                        <h4>Save Card</h4>
                        <Close style={{ cursor: 'pointer' }} onClick={() => setCardModal(false)} />
                    </div>
                    <div className='card__modal-2'>
                        <form style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '20px',
                            marginTop: '10px',
                            borderRight: '1px solid #EEE'
                        }}>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Card number'
                                    inputProps={{
                                        id: 'number',
                                        name: 'number',
                                        type: 'number'
                                    }}
                                    value={cardForm.number}
                                    onChange={(newValue, field) => handleCardFormChange(field, newValue)}
                                />
                            </div>
                            <div style={{ width: '450px' }}>
                                <Input
                                    label='Nickname'
                                    inputProps={{
                                        id: 'name',
                                        name: 'name',
                                    }}
                                    value={cardForm.name}
                                    onChange={(newValue, field) => handleCardFormChange(field, newValue)}
                                />
                            </div>
                            <div style={{ width: '250px', display: 'flex', alignItems: 'center' }}>
                                <Dropdown
                                    label='Expiry date'
                                    inputProps={{
                                        id: 'month',
                                        name: 'month',
                                    }}
                                    value={cardForm.month}
                                    valueKey='id'
                                    onChange={(newValue, field) => handleCardFormChange(field, newValue)}
                                >
                                    {months.map(month =>
                                        <option
                                            key={month.id}
                                            value={month.id}
                                            data={month}
                                        >{month.value}</option>
                                    )}
                                </Dropdown>
                                <Dropdown
                                    label={<p>&nbsp;</p>}
                                    inputProps={{
                                        id: 'year',
                                        name: 'year',
                                    }}
                                    value={cardForm.year}
                                    valueKey='id'
                                    onChange={(newValue, field) => handleCardFormChange(field, newValue)}
                                >
                                    {years.map(year =>
                                        <option
                                            key={year.id}
                                            value={year.id}
                                            data={year}
                                        >{year.value}</option>
                                    )}
                                </Dropdown>
                            </div>
                        </form>
                        <div style={{ width: '500px' }}>
                            <p style={{ marginLeft: '20px' }}>Please ensure that you enable your card for online payments from your bank's app.</p>
                            <DisplayCards />
                        </div>
                    </div>
                    <div className='card__modal-3'>
                        <div>
                            <Button
                                type='secondary'
                                onClick={() => setCardModal(false)}
                                label='Cancel'
                            />
                        </div>

                        <div>
                            <Button
                                onClick={handleCardSubmit}
                                disabled={validateCardForm()}
                                label='Use this address'
                            />
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default CheckoutAddress