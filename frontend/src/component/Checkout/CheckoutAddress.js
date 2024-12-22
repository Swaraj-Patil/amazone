import { Add, Close, ExpandMore, KeyboardArrowDown } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createAddress, fetchCountries, fetchStatesOfCountry, getAllAddresses } from '../../redux/actions/addressActions'
import { toast } from 'react-toastify'
import { Loader } from '../Layout'
import Input from '../../utils/Input'
import TextArea from '../../utils/TextArea'
import Dropdown from '../../utils/Dropdown'
import { ALL_COUNTRIES_SUCCESS, CREATE_ADDRESS_RESET } from '../../redux/constants/addressConstants'
import Button from '../../utils/Button'

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

const CheckoutAddress = () => {
    const dispatch = useDispatch()
    const { addresses, error: addressError, loading } = useSelector(state => state.allAddresses)
    const { countries } = useSelector(state => state.countries)
    const { states } = useSelector(state => state.states)
    const { loading: createAddLoader, error: createAddError, success } = useSelector(state => state.createAddress)

    const [addressModal, setAddressModal] = useState(false)
    const [addressForm, setAddressForm] = useState({
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
    })
    const [instructions, setInstructions] = useState(false)
    const [formValid, setFormValid] = useState(false)
    const [accordionExpanded, setAccordionExpanded] = useState(false)

    const handleAddressModalOpen = () => {
        setAddressModal(true)
    }

    const handleAddressFormChange = (value, field) => {
        setAddressForm(prevState => ({
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


    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setAccordionExpanded(isExpanded ? panel : false)
    };

    const handleAddressEdit = address => { }
    const handleAddressDelete = addressId => { }

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
    }, [addressForm.country, addressModal])

    useEffect(() => {

        if (createAddError) {
            toast.error(createAddError)
        }

        if (success) {
            toast.success(success)
            dispatch({ type: CREATE_ADDRESS_RESET })
        }
    }, [success, createAddError, dispatch])

    return (
        <>
            {loading ? <Loader /> :
                <div className='checkout__address'>
                    <div></div>
                    <Accordion expanded={accordionExpanded === 'address'} onChange={handleAccordionChange('address')}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Your Addresses
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <ul className='address__list'>
                                    {
                                        addresses?.length > 0 && addresses.map(address => <li key={address?._id}>
                                            <input type="radio" name="" id="" />
                                            <p>
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
                                                        onClick={() => handleAddressDelete(address.id)}
                                                    // >Add delivery instructions</span>
                                                    >Delete address</span>
                                                </div>
                                            </p>
                                        </li>)
                                    }
                                    <li>
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', color: '#007185', cursor: 'pointer', marginTop: '10px' }}
                                            onClick={handleAddressModalOpen}
                                        >
                                            <span style={{ color: 'grey', marginRight: '6px' }}><Add /></span>
                                            <span>Add a new address</span>
                                        </div>
                                    </li>
                                </ul>
                                <div style={{ width: 'max-content', marginTop: '16px' }}>
                                    <Button
                                        // onClick={handleAddressSelection}
                                        disabled={!formValid}
                                        label='Deliver to this address'
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
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
        </>
    )
}

export default CheckoutAddress