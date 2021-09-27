import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct} from "../../../functions/product";
import { getCategories, getCategorySubs} from "../../../functions/category";
import FileUpload from "../../../components/forms/fileUpload";
import {LoadingOutlined} from '@ant-design/icons'
import { useParams } from "react-router";
import { getProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title:'',
    description:'',
    price:'',
    category:'',
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    colors:["Black", "Brown","Silver","White","Red"],
    brands:["Apple", "Samsung","Microsoft","Lenovo","ASUS"],
    color:'',
    brand:'',
}


const ProductUpdate = ({match}) => {

 const [values, setValues] = useState(initialState);
 const [subOptions, setSubOptions] = useState([]);
 const [categories,setCategories] = useState([]);
 

const {user} = useSelector((state) => ({...state}));

const {slug} = match.params;

useEffect(() => {
    loadProduct();
    loadCategories();
}, [])

const loadProduct = () => {
    getProduct(slug)
    .then(p => {
        //console.log('single product', p)
        setValues({...values, ...p.data});
    })
}

const loadCategories = () =>
    getCategories().then((c) => {
    console.log('Get categories in update product')
    setCategories(c.data);
    });

const handleSubmit = (e) => {
    e.preventDefault();
    //
};

const handleChange = (e) => {
    setValues({...values, [e.target.name]: e. target.value})
}


const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('CLICKED CATEGORY', e.target.value);
    setValues({...values, subs: [], category: e.target.value});
    getCategorySubs(e.target.value)
    .then((res) => {
        console.log('SUB OPTION ON CATEGORY CLICK', res)
        setSubOptions(res.data);
    });
};

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                
                <div className="col-md-10">
                <h4>Product Update</h4>
                {JSON.stringify(values)}

                <ProductUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                values={values} 
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                subOptions={subOptions}
                />

                <hr/>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;