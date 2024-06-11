import React, { useEffect, Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts, clearErrors } from '../../redux/actions/productActions'
import { Loader, MetaData, DropdownMenu } from '../Layout'
import { ProductCard } from '../../component'
// import { error as ToastError } from 'react-toastify-redux'
import { toast } from 'react-toastify'
import './Products.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { Rating } from '@mui/material'
import { StarBorder } from '@mui/icons-material'

const categories = [
  'Electronics',
  'Laptops',
  'Footwear',
  'Clothing',
  'Smartphones',
  'Camera',
  'Medicines',
  'Accessories',
  'Food'
]

const Products = () => {

  const dispatch = useDispatch()
  const { products, error, loading, resultPerPage, filteredProductsCount } = useSelector(state => state.products)
  const { keyword } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState([0, 999999])
  const [rating, setRating] = useState(0)

  const options = {
    readOnly: true,
    precision: 0.5,
    emptyIcon: <StarBorder style={{ color: '#CD9042' }} />
  }

  useEffect(() => {

    if (error) {
      // dispatch(ToastError(error))
      toast.error(error)
      dispatch(clearErrors())
    }

    dispatch(getAllProducts(keyword, currentPage, price, category, rating))

  }, [dispatch, error, keyword, currentPage, price, category, rating])

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <div className='products'>
          <MetaData title={`Amazone.in: ${keyword || 'All Products'}`} />
          <div className='products__header'>
            <p>{filteredProductsCount > 8 ? `1-${resultPerPage} of over` : ''} {filteredProductsCount} {filteredProductsCount === 1 ? 'result' : 'results'} for <strong>"{keyword || 'All Products'}"</strong></p>
            <DropdownMenu />
          </div>

          <div style={{ marginLeft: '17rem' }}>
            <h3 style={{ margin: 10 }}>Results</h3>
            <p style={{ margin: 10, color: '#565959'}}>{!filteredProductsCount ? `No results for ${keyword || 'all products'}` : 'Price and other details may vary based on product size and colour.'}</p>

            <div className='products__list'>
              {products && products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>


          <div className='products__filterbox'>
            <div>
              <h4>Price</h4>

              <span onClick={() => {setPrice([0, 1000])}}> Under ₹1,000</span>
              <span onClick={() => {setPrice([1000, 5000])}}>₹1,000 - ₹5,000</span>
              <span onClick={() => {setPrice([5000, 10000])}}>₹5,000 - ₹10,000</span>
              <span onClick={() => {setPrice([10000, 20000])}}>₹10,000 - ₹20,000</span>
              <span onClick={() => {setPrice([20000, 999999])}}>Over ₹20,000</span>

              <form style={{ display: 'flex'}}>
                <div>
                  <label htmlFor='min'>₹</label>
                  <input name='min' type='number' placeholder='Min' value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                </div>
                <div className='flex__center'>
                  <label htmlFor='max'>₹</label>
                  <input name='max' type='number' placeholder='Max' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                </div>
                <button className='button-secondary' onClick={() => {setPrice([Number(minPrice), Number(maxPrice)])}}>Go</button>
              </form>
            </div>

            <div>
              <h4>Category</h4>

              { categories.map(item => (
                <span key={item} onClick={e => setCategory(item)}>{category === item ? <strong>{item}</strong> : item}</span>
              ))}
            </div>

            <div>
              <h4>Customer Review</h4>

              <span onClick={() => setRating(4)} className='app__center' style={{ justifyContent: 'unset', fontSize: 13 }}><Rating {...options} value={4} /> & Up</span>
              <span onClick={() => setRating(3)} className='app__center' style={{ justifyContent: 'unset', fontSize: 13 }}><Rating {...options} value={3} /> & Up</span>
              <span onClick={() => setRating(2)} className='app__center' style={{ justifyContent: 'unset', fontSize: 13 }}><Rating {...options} value={2} /> & Up</span>
              <span onClick={() => setRating(1)} className='app__center' style={{ justifyContent: 'unset', fontSize: 13 }}><Rating {...options} value={1} /> & Up</span>
            </div>

          </div>

          {resultPerPage < filteredProductsCount &&
            <div className='pagination__box'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={e => setCurrentPage(e)}
                nextPageText='Next >'
                prevPageText='< Previous'
                itemClass='pagination__item'
                linkClass='pagination__link'
                activeClass='pagination__active'
                activeLinkClass='pagination__activeLink'
                hideFirstLastPages={true}
                disabledClass='pagination__disabled'
              />
            </div>
          }

        </div>
      )}
    </Fragment>
  )
}

export default Products
