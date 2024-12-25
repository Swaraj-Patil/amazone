import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Input, TextArea } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createNewProduct } from '../../redux/actions/productActions'
import './Admin.css'
import { Info, InfoOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { CREATE_PRODUCT_RESET } from '../../redux/constants/productConstants'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../Layout'

const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Laptops' },
    { id: 3, name: 'Footwear' },
    { id: 4, name: 'Clothing' },
    { id: 5, name: 'Smartphones' },
    { id: 6, name: 'Camera' },
    { id: 7, name: 'Medicines' },
    { id: 8, name: 'Accessories' },
    { id: 9, name: 'Food' },
]

const CreateProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { loading, error, success } = useSelector(state => state.createProduct)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState({ id: 1, name: 'Electronics' })
    const [stock, setStock] = useState(90)
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const createProductImagesChange = e => {
        const files = Array.from(e.target.files)

        setImages([])
        setImagesPreview([])

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(prevImages => [...prevImages, reader.result])
                    setImages(prevImages => [...prevImages, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const handleProductCreation = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set('name', name)
        myForm.set('description', description)
        myForm.set('brand', brand)
        myForm.set('price', price)
        myForm.set('category', category.name)
        myForm.set('stock', stock)
        images.length > 0 && images.forEach((image) => {
            myForm.append("images", image)
        })

        dispatch(createNewProduct(myForm))
    }

    const formValid = name?.length > 2 && description?.length > 2 && brand?.length > 2 && price !== 0 && category && images.length > 0

    useEffect(() => {
        if (user.role !== 'Admin') {
            navigate('/login')
            toast.error('You are not authorized to access this resource.')
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            toast.success('Product created successfully.')
            navigate('/')
            dispatch({ type: CREATE_PRODUCT_RESET })
        }
    }, [user, navigate, error, toast, dispatch, success])

    return (
        <>
            {loading
                ? <Loader />
                : <div className='admin__create-product app__center'>

                    <h2>Create a new product</h2>

                    <p style={{
                        fontWeight: 700,
                        fontSize: '12px',
                        backgroundColor: '#DDECF1',
                        padding: '1rem 2rem',
                        color: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '10px'
                    }}><span><InfoOutlined fontSize='18px' /></span>When multiple sellers sell the same product through a single detail page, we combine and present the best product data to ensure customers get the best experience.</p>

                    <form style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', marginTop: '10px' }}>
                        <div style={{ width: '450px' }}>
                            <Input
                                label='Product Name'
                                inputProps={{
                                    id: 'name',
                                    name: 'name',
                                }}
                                value={name}
                                onChange={(newValue) => setName(newValue)}
                            />
                        </div>
                        <div style={{ width: '450px' }}>
                            <Input
                                label='Brand Name'
                                inputProps={{
                                    id: 'brand',
                                    name: 'brand',
                                }}
                                value={brand}
                                onChange={(newValue) => setBrand(newValue)}
                            />
                            <p style={{ fontSize: '12px', marginLeft: '10px' }}>To list your products after your brand is enrolled, enter the brand name exactly as you submitted it for brand approval, and specify a unique value for the Key Attribute that you selected in the brand registry application. You can always edit the productdetails later in the Manage inventory.</p>
                        </div>
                        <div style={{ width: '450px' }}>
                            <p style={{ padding: '5px 0 0 10px', fontSize: '14px', fontWeight: 700 }}>Description</p>
                            <TextArea
                                inputProps={{
                                    id: 'description',
                                    name: 'description',
                                }}
                                value={description}
                                onChange={(newValue) => setDescription(newValue)}
                            />
                        </div>
                        <div style={{ width: '450px' }}>
                            <Input
                                label='Price'
                                inputProps={{
                                    id: 'price',
                                    name: 'price',
                                    type: 'number'
                                }}
                                value={price}
                                onChange={(newValue) => setPrice(newValue)}
                            />
                        </div>
                        <div style={{ width: 450 }}>
                            <Dropdown
                                label='Category'
                                inputProps={{
                                    id: 'category',
                                    name: 'category',
                                    placeholder: 'Choose an Option'
                                }}
                                value={category}
                                valueKey='id'
                                onChange={newValue => setCategory(newValue)}
                            >
                                {categories.map(item =>
                                    <option
                                        key={item.id}
                                        value={item.id}
                                        data={item}
                                    >{item.name}</option>
                                )}
                            </Dropdown>
                        </div>
                        <div style={{ width: '450px' }}>
                            <Input
                                label='Stock'
                                inputProps={{
                                    id: 'stock',
                                    name: 'stock',
                                    type: 'number'
                                }}
                                value={stock}
                                onChange={(newValue) => setStock(newValue)}
                            />
                        </div>
                        <div style={{ width: '450px' }} id='createProductFormFile'>
                            <input
                                type='file'
                                name='avatar'
                                accept='image/*'
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt='Create Preview' />
                            ))}
                        </div>

                        <div style={{ width: 450, marginLeft: '10px' }}>
                            <Button
                                onClick={handleProductCreation}
                                disabled={!formValid}
                                label='Create Product'
                            />
                        </div>
                    </form>
                </div>}
        </>
    )
}

export default CreateProduct