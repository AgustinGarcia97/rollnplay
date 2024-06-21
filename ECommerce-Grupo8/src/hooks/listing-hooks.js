import {useEffect, useState} from "react";

const useFetchListingsCreate = () => {
    const [userId, setUserId] = useState("");
    const [listingId, setListingId] = useState("");
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImageList] = useState([]);
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [productDTO, setProductDTO] = useState("");
    const [listingState, setListingState] = useState("");
    const [category, setCategory] = useState("");


    const data = {
        "userId": userId,
        "listingId": listingId,
        "title": title,
        "description": description,
        "images": images,
        "price": price,
        "stock": stock,
        "productDTO": productDTO,
        "listingState": listingState,

    }

    return {userId, listingId, title, description, images, price, stock, setListingId, setUserId, setTitle, setDescription, setImageList, setPrice,
        setStock, setProductDTO, setListingState};

}

const useFetchListingDialog = (data) => {

// Configuración de la solicitud
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3lwdEBleGFtcGxlLmNvbSIsImlhdCI6MTcxODg2NDI0" +
                "OCwicm9sZSI6IlVTRVIiLCJleHAiOjE3MjE0NTYyNDh9.lFF1Ct82U6vL-NOcvIu8ypu589OoQvf-IVsH1ItLHTTBB6MEbD0Ypc" +
                "Hc4WIZdClPLC06wMLzGTdMGhuiE9gXng" //localStorage.getItem("token"),
        },
        body: JSON.stringify(data)
    };



    useEffect( ()  => {
        const fetchData = async () => {
            const data = await fetch("http://localhost:8080/listing/create-listing", options)
        }
        fetchData()
    }, []);


}

const useFetchListings = (selectedCategories = []) => {
    const [productos, setProducts] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3lwdEBleGFtcGxlLmNvbSIsImlhdCI6MTcxODg2NDI0OCwicm9sZSI6IlVTRVIiLCJleHAiOjE3MjE0NTYyNDh9.lFF1Ct82U6vL-NOcvIu8ypu589OoQvf-IVsH1ItLHTTBB6MEbD0YpcHc4WIZdClPLC06wMLzGTdMGhuiE9gXng"
        }
    };

    useEffect(() => {
        const fetchListings = async () => {
            if (selectedCategories.length === 0) {
                try {
                    const response = await fetch("http://localhost:8080/listing/get-listings", options);
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching all listings:', error);
                }
            } else {
                try {
                    const requests = selectedCategories.map( async (category)  =>  {
                        let [type, value] = category.split(':');

                        switch (type) {
                            case "categoria":
                                type = "category"
                                break;
                            case "dificultad":
                                type = "difficulty"
                                break;
                            case "duracion":
                                type = "duration"
                                break;
                            case "marca":
                                type = "brand"
                                break;
                        }

                        const response = await  fetch(`http://localhost:8080/listing/get-listing/${type}?${type}=${value.toLowerCase()}`, options)
                        return response.json()
                    });

                    const responses = await Promise.all(requests);
                    const data = responses.flat();

                    const uniqueIds = new Set();
                    const uniqueProducts = data.filter(product => {
                        if (!uniqueIds.has(product.listingId)) {
                            uniqueIds.add(product.listingId);
                            return true;
                        }
                        return false;
                    });

                    setProducts(uniqueProducts);
                } catch (error) {
                    console.error('Error fetching filtered listings:', error);
                }
            }
        };

        fetchListings();
    }, [selectedCategories]);

    return productos;
};



export {useFetchListingDialog, useState,useFetchListings}