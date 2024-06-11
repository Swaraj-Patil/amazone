import React, { useRef, useEffect, useState } from 'react'
import './ProductDetails.css'
import { Rating } from '@mui/material'
import { LocalOffer, ArrowForwardIos, ArrowBackIos, Lock, KeyboardArrowDown, StarBorder } from '@mui/icons-material'
import { primeIcon, pd1, pd2, pd3, pd4, pd5, pd6 } from '../../assets'
import { Loader, MetaData } from '../../component/Layout'
import AddCard from './AddCard'
import ReviewCard from './ReviewCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../redux/actions/productActions'
import { addItemsToCart } from '../../redux/actions/cartActions'
import { useParams } from 'react-router-dom'
// import { error as ToastError, success as ToastSuccess } from 'react-toastify-redux'
import { toast } from 'react-toastify'

const offers = [
  {
    title: 'No Cost EMI',
    description: 'Upto ₹1,481 EMI interest savings on credit cards.'
  },
  {
    title: 'Cashback',
    description: 'Get 5% back with Amazone Pay ICICI Bank credit card'
  },
  {
    title: 'Partner Offers',
    description: 'Free Spotify premium subscription on purchase of ₹5,000 and above'
  },
]

const features = [
  {
    icon: pd1,
    description: 'Free Delivery'
  },
  {
    icon: pd2,
    description: '7 days Replacement'
  },
  {
    icon: pd3,
    description: 'Warrenty Policy'
  },
  {
    icon: pd4,
    description: 'Secured Transaction'
  },
  {
    icon: pd5,
    description: 'Top Brand'
  },
  {
    icon: pd6,
    description: 'Amazone Delivered'
  },
]

const ads = [
  {
    imageUrl: 'https://m.media-amazon.com/images/I/61M2CPqMgwL._SX679_.jpg',
    title: 'Gigastone Brown Switch Gaming Keyboard...',
    rating: 4.5,
    numOfReviews: 1600,
    price: 40000
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/61lVIdL-DXL._SX679_.jpg',
    title: 'PHILIPS Cordless OneBlade Hybrid Trimmer...',
    rating: 4.8,
    numOfReviews: 23000,
    price: 2599
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/919vpgYaMWL._UX679_.jpg',
    title: 'Adidas Excel Backpack...',
    rating: 4.6,
    numOfReviews: 1160,
    price: 9952
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/81KUD5T62SL._SX569_.jpg',
    title: 'Divine Casa Comforter 100% cott...',
    rating: 4,
    numOfReviews: 14,
    price: 1790
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/51ofdcSHoUL._SX679_.jpg',
    title: 'PTron Bassbuds Jade Truly Wireless Earbuds...',
    rating: 4.1,
    numOfReviews: 108,
    price: 999
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/4168I-MRw6L.jpg',
    title: 'Luxrio Blazer for Men (Multiple Colors Avai...',
    rating: 3.0,
    numOfReviews: 50,
    price: 2099
  },
]

const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const OffersCard = ({ title, description }) => (
  <div className='productDetails__info-offersCard'>
    <p>{title}</p>
    <p>{description}</p>
  </div>
)

const FeaturesCard = ({ icon, description }) => (
  <div className='productDetails__info-featuresCard'>
    <img src={icon} alt="Features" />
    <p>{description}</p>
  </div>
)

function shuffle(array) {
  let currentIndex = array.length, randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

const ProductDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch()

  let { error: productError, product, loading } = useSelector(state => state.productDetails)

  const [quantity, setQuantity] = useState(1)

  var date = new Date()
  let amazonsChoice = true
  const offersContainer = useRef(null)
  const featuresContainer = useRef(null)
  const ratingsRotate = useRef(null)
  const ratingsHide = useRef(null)
  const carouselImage = useRef(null)


  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    emptyIcon: <StarBorder style={{ color: '#CD9042' }} />
  }

  const toggleRatingCalc = () => {
    ratingsRotate.current.classList.toggle('active')
    ratingsHide.current.classList.toggle('active')
  }

  const handlePagination = e => {
    carouselImage.current.src = e.target.querySelector('img').src
    e.target.focus()
  }

  function addToCartHandler() {
    dispatch(addItemsToCart(id, quantity))
    // dispatch(ToastSuccess(`Added to cart.`))
    toast.success('Added to cart')
  }

  const discount = 11

  useEffect(() => {
    if (productError) {
      // dispatch(ToastError(productError))
      toast.error(productError)
      dispatch(clearErrors())
    }

    dispatch(getProductDetails(id))

    shuffle(ads)

  }, [dispatch, productError, id])

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <div className='productDetails'>
            <MetaData title={product.name} />
            <div className='productDetails__carousel'>

              <div className="productDetails__carousel-left">
                {product.images && product.images.map(image => (
                  <button
                    key={image._id}
                    onMouseOver={e => handlePagination(e)}
                  >
                    <img src={image.url} alt="preview" style={{ pointerEvents: 'none' }} />
                  </button>
                ))}
              </div>



              <div className="productDetails__carousel-right">
                {product.images && (
                  <img src={product.images[0].url} alt='Product' ref={carouselImage} />
                )}
              </div>

            </div>

            <div className="productDetails__info">

              <div>
                <h1>{product.name}</h1>
                <a href='brand.com' className='productDetails__info-brand' target='blank'>Brand: {product.brand}</a>

                <div className='productDetails__info-rating'>
                  <p>
                    {product.ratings} &nbsp;<span><Rating {...options} /></span> &nbsp; <span>{product.numOfReviews} ratings</span>
                  </p>
                </div>

                {amazonsChoice && <div className='amazons-choice'>Amazon's <span>Choice</span></div>}

                <div className='line-break'></div>

                <div className="productDetails__info-price">
                  {/* <p><span>-11%</span>&nbsp; <sup>₹</sup>32,900</p> */}
                  <p><span>-{discount}%</span>&nbsp; <sup>₹</sup>{product?.price?.toLocaleString('en-IN')}</p>
                  {/* <p>M.R.P.: <span>₹36,900</span></p> */}
                  <p>M.R.P.: <span>₹{(product?.price + (product.price * discount) / 100)?.toLocaleString('en-IN')}</span></p>
                </div>

                <p style={{ fontSize: 14, color: '#CC0C39' }}>Deal</p>

                <div className='productDetails__info-prime'><img src={primeIcon} alt="Prime" />Same-Day</div>

                <p style={{ fontSize: 14, color: '0F1111' }}>
                  Inclusive of all taxes
                  <br />
                  {/* <strong>EMI</strong> starts at ₹1,572. No cost EMI available */}
                  <strong>EMI</strong> starts at ₹{Math.round(product?.price / 6)?.toLocaleString('en-IN')}. No cost EMI available
                </p>

                <div className='line-break'></div>

                <div className="productDetails__info-offers">
                  <div>
                    <span><LocalOffer /></span>
                    <h4>Offers</h4>
                  </div>

                  <div ref={offersContainer}>
                    <button style={{ left: 0 }} onClick={() => offersContainer.current.scrollLeft -= 20}><ArrowBackIos /></button>
                    {
                      offers.map((offer, index) => <OffersCard key={index} title={offer.title} description={offer.description} />)
                    }
                    <button style={{ right: 0 }} onClick={() => offersContainer.current.scrollLeft += 20}><ArrowForwardIos /></button>
                  </div>
                </div>

                <div className="line-break"></div>

                <div className="productDetails__info-features" ref={featuresContainer}>
                  <button style={{ left: 0 }} onClick={() => featuresContainer.current.scrollLeft -= 20}><ArrowBackIos /></button>
                  {
                    features.map((feature, index) => <FeaturesCard key={index} icon={feature.icon} description={feature.description} />)
                  }
                  <button style={{ right: 0 }} onClick={() => featuresContainer.current.scrollLeft += 20}><ArrowForwardIos /></button>
                </div>

                <div className="line-break"></div>

                <div className="productDetails__info-description">
                  <p>About this item</p>
                  <p>
                    {
                      product.description && product.description.split('.').map((line, index) => (
                        <li key={index}>{line}</li>
                      ))
                    }
                  </p>
                </div>
              </div>

              <div>

                <div>
                  <div className="productDetails__info-price">
                    {/* <p><sup>₹</sup>32,900<sup>00</sup></p> */}
                    <p><sup>₹</sup>{product.price?.toLocaleString('en-IN')}<sup>00</sup></p>
                    <p></p>
                  </div>

                  <div className='productDetails__info-prime'><img src={primeIcon} alt="Prime" />Same-Day</div>

                  <p style={{ marginBottom: '1rem' }}>FREE delivery <strong>{date.getHours() < 20 ? 'Today' : 'Tomorrow'} by 10 PM.</strong> Order within <span className='green-color'>{24 - date.getHours()} hrs 48 mins.</span></p>

                  <p className={product.stock < 1 ? 'red-color' : 'green-color'} style={{ fontSize: 18 }}>
                    {product.stock < 1 ? 'Currently unavailable' : 'In Stock'}
                  </p>

                  <p className='productDetails__info-soldBy'>Sold by <a target='_blank' rel='noreferrer' href={`https://www.${product.brand}.com`}>{product.brand} Private Ltd </a> <br />and <a href='amazon.in'>Fulfilled by Amazone</a>.</p>

                  <div className='productDetails__info-quantity'>
                    <p>Quantity: &nbsp;</p>
                    <select name="quantity" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))}>
                      {
                        product.stock < 11
                          ? [...Array(product?.stock)].map((_, index) => <option key={index} value={index+1}>{index+1}</option>)
                          : quantities.map(item => <option key={item} value={item}>{item}</option>)
                      }
                    </select>
                  </div>

                  <div>
                    <button
                      disabled={!product.stock}
                      className='add-to-cart-button'
                      onClick={addToCartHandler}
                    >Add to Cart</button>
                  </div>

                  <div>
                    <button
                      disabled={!product.stock}
                      className='add-to-cart-button buy-now-button'
                    >Buy Now</button>
                  </div>

                  <p className='productDetails__info-transaction'><Lock />Secure transaction</p>

                  <div className='productDetails__info-gift'>
                    <input type="checkbox" name="gift-option" id="" />
                    <p>Add gift options</p>
                  </div>

                </div>

                <div>
                  <AddCard ad={ads[0]} />
                  <AddCard ad={ads[1]} />
                </div>
              </div>

            </div>
          </div>

          <div style={{ margin: 0 }} className="line-break"></div>

          <div className='productReviews'>
            <div className='productReviews__left'>
              <div>
                <h2>Customer reviews</h2>
                <div>
                  <Rating {...options} />
                  <p>{product && product.ratings} out of 5</p>
                </div>
                {/* <p>5,633 global ratings</p> */}
                <p>{product && product.numOfReviews} global ratings</p>
                <div className='ratings-calc' onClick={toggleRatingCalc}>
                  <KeyboardArrowDown ref={ratingsRotate} />
                  <span>How are ratings calculated?</span>
                </div>
                <p className='rating-calc-desc' ref={ratingsHide}>
                  To calculate the overall star rating and percentage breakdown by star, we don’t use a simple average. Instead, our system considers things like how recent a review is and if the reviewer bought the item on Amazon. It also analyses reviews to verify trustworthiness.
                </p>
              </div>

              <div className="line-break"></div>

              <div>
                <h3>Review this product</h3>
                <p>Share your thoughts with other customers</p>
                <button className="button-secondary">Write a product review</button>
                <div className='line-break'></div>
              </div>

            </div>

            <div className='productReviews__right'>
              {product.reviews && product.reviews[0] ? <h4>Top reviews from India</h4> : null}


              {
                product.reviews && product.reviews[0]
                  ? product.reviews.map(review => <ReviewCard key={review._id} review={review} />)
                  : <strong>No customer reviews</strong>
              }

            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails
