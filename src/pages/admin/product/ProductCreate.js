import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct} from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs} from "../../../functions/category";


const initialState = {
    title:'',
    description:'',
    price:'',
    categories:[],
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

const ProductCreate = () => {
const [values, setValues] = useState(initialState);
const [subOptions, setSubOptions] = useState([]);
const[showSub,setShowSub] =useState(false);

const {user} = useSelector((state) => ({...state}));

useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({...values, categories: c.data}));

const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
    .then(res =>{
        console.log(res)
        window.alert(`${res.data.title} is created`);
        window.location.reload();
    })
    .catch(err => {
        console.log(err)
        toast.error(err.response.data.err);
        //if (err.response.status === 400) toast.error(err.response.data);
    });
};

const handleChange = (e) => {
    setValues({...values, category: e.target.value});
};


const handleCategorychange = (e) => {
    e.preventDefault()
    console.log('CLICKED CATEGORY', e.target.value)
    setValues({...values, [e.target.name]: e.target.value});
    getCategorySubs(e.target.value)
    .then(res => {
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
                   <h4>Product Create</h4>

                   <ProductCreateForm 
                   handleSubmit={handleSubmit} 
                   handleChange={handleChange} 
                   setValues={setValues}
                   values={values}
                   handleCategorychange={handleCategorychange}
                   subOptions={subOptions}
                   showSub={showSub}
                   />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;