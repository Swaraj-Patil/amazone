import React from 'react'
import logoDark from '../../assets/logo-dark.png'
import logoDark2 from '../../assets/logo-dark-2.png'

const AddressCard = ({
    name,
    addressLine,
    area,
    city,
    state,
    pincode,
    country,
    mobile,
    deliveryInstructions,
    defaultAddress
}) => {
    return (
        <div className='addresses__card'>
            <div>
                {defaultAddress &&
                    <div className='addresses__card-default'>
                        <p>Default:</p>
                        <div>
                            <img src={logoDark} alt="Amaonze Logo" />
                        </div>
                    </div>
                }

                <div className='addresses__card-details'>
                    <h2>{name}</h2>
                    <p>{`${addressLine}, ${area}, ${city.toUpperCase()}, ${state.toUpperCase()} ${pincode}`}</p>
                    <p>{country}</p>
                    <p>Phone Number: {mobile}</p>
                    <button>Add delivery instructions</button>
                </div>

            </div>

            <div className='addresses__card-actions'>
                <button>Edit</button>
                <span>|</span>
                <button>Remove</button>
                {!defaultAddress &&
                    <>
                        <span>|</span>
                        <button>Set as Default</button>
                    </>
                }
            </div>
        </div>
    )
}

export default AddressCard