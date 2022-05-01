import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector             } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Pagination                               from 'react-js-pagination'
import MetaData                                 from './layouts/MetaData'
import Product                                  from './product/Product'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Loader from './layouts/Loader'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const Home = () => {  
    
    const dispatch = useDispatch()

    const [ currentPage, setCurrentPage ] = useState(1) 
    const [ filter,      setFilter      ] = useState('') 

    const { loading, products, resPerPage, error, productsCount } = useSelector( state => state.products )

    useEffect(() => {  
        if(error) {
            return alert.error(error)        
        } 
        dispatch(getProducts('', currentPage, [1, process.env.REACT_APP_MAX_PRICE])) 
    }, [dispatch, currentPage, error])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>

            <MetaData title={'Home'} />     
              
            <div className="container">

                <div className="wrapper"> 

                    {loading ? <Loader /> : (

                        <Fragment>

                            <h1>Latest Products</h1>

                            <FormControl variant="standard"  fullWidth sx={{ mb: 1 }}>
                                <InputLabel>Filter</InputLabel>
                                <Select 
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}   
                                >                                                                   
                                    <MenuItem value="popular">  
                                        Most Popular
                                    </MenuItem>  
                                    <MenuItem value="highToLow">  
                                        Price High to Low
                                    </MenuItem>
                                    <MenuItem value="lowToHigh">  
                                        Price Low to High
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <div className="showroom">
                                {products && products.length > 0                             
                                    ?   products.map(product => (
                                            <Product key={product._id} product={product} />                                    
                                        )) 
                                    :   <p>No Results Found</p>
                                }    
                            </div>  

                        </Fragment>                  
                    )}

                    {resPerPage <= productsCount && (
                        <div onClick={() => window.scrollTo(0, 0)}>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}                        
                                onChange={setCurrentPageNo}   
                                nextPageText={<KeyboardArrowRightIcon />}  
                                prevPageText={<KeyboardArrowLeftIcon />} 
                                firstPageText={<FirstPageIcon />} 
                                lastPageText={<LastPageIcon />}  
                            />
                        </div>
                    )}                 
                          
                </div>

            </div>   
           
        </Fragment>
    )
}

export default Home