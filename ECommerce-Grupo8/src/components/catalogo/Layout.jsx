import {Grid} from "@mui/material";
import SidebarFilter from "./SidebarFilter.jsx";
import CatalogView from "./CatalogView.jsx";
import {useEffect, useState} from "react";

import {useFetchListings} from "../../hooks/listing-hooks.js";
import {useDispatch, useSelector} from "react-redux";
import {loadingFetch} from "../../redux/slices/listingsSlice.js";
import {useFetchBrand, useFetchDifficulty, useFetchDuration, useFetchPlayers} from "../../hooks/product_hooks.js";
import {useParams} from "react-router-dom";








const Layout = ({text}) => {

    const [products,setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const dispatch = useDispatch();
    const {listing} = useParams();
    const productos = useFetchListings(selectedCategories, dispatch, listing);
    const listings = useSelector(state => state.listing_stock.listings);

    const [searchedListing,setSearchedListing] = useState(listing);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(productos);
    }, [ productos]);



    useEffect(() => {
        useFetchPlayers();
        useFetchBrand(dispatch);
        useFetchDuration();
        useFetchDifficulty();
    }, []);





    return(
        <Grid container >
            <Grid item xs={4} sm={3} md={2} sx={{padding:'5px'}} >
                <SidebarFilter  setSelectedCategories ={setSelectedCategories}  selectedCategories = {selectedCategories}></SidebarFilter>
            </Grid>
            <Grid item xs={4} sm={4} md={10} sx={{padding:'5px'}} >
                <CatalogView  productos={filteredProducts} ></CatalogView>
            </Grid>
        </Grid>
    );
}


export default Layout;