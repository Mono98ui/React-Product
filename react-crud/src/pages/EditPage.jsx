import axios from "axios"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {toast} from 'react-toastify'
import{VITE_BACKEND_URL} from "../App"

const EditPage = () => {
	let {id} = useParams()
	const [isLoading, setIsloading] = useState(false)
	const [product, setProduct] = useState({
		name:"",
		quantity:"",
		price:"",
		image:"",
	})
	const navigate = useNavigate()

	const getProduct = async() =>{
		setIsloading(true)

		try{
			const response = await axios.get(`${VITE_BACKEND_URL}api/products/${id}`)
		setProduct({
			name: response.data.name,
			quantity:response.data.quantity,
			price:response.data.price,
			image:response.data.image,
		})
		setIsloading(false)
		}catch(error){
			setIsloading(false)
			toast.error(error.message)

		}

	}

	const updateProduct = async(e) => {
		e.preventDefault()
		if(product.name === "" || product.quantity === "" || product.price === "" || product.image === ""){
			alert('Please fill out all input completely')
			return
		}

		try{
			setIsloading(true)
			const response = await axios.put(`${VITE_BACKEND_URL}api/products/${id}`,product)
			toast.success(`Updated ${response.data.name} sucessfuly`)
			setIsloading(false)
			navigate("/")
		}
		catch(error){
			console.log(error)
			toast.error(error.message)
			setIsloading(false)
		}
	}

	useEffect(()=>{
		getProduct()
	},[])
	return(
		<div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
			<h2 className="font-semibold text-2xl mb-4 block text-center">
				Update a Product - {product.name}
			</h2>

			{isLoading ? ("Loading"):(

				<>
					<form onSubmit={updateProduct}>
					<div className="space-y-2">
						<div>
							<label>Name</label>
							<input type="text" value={product.name} onChange={(e) =>setProduct({...product,name: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name"/>
							<label>Quatity</label>
							<input type="number" value={product.quantity} onChange={(e) =>setProduct({...product,quantity: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity"/>
							<label>Price</label>
							<input type="number" value={product.price} onChange={(e) =>setProduct({...product,price: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price"/>
							<label>Image URL</label>
							<input type="text"  value={product.image} onChange={(e) =>setProduct({...product,image: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL"/>
							<div>
								{!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update</button>)}
							</div>
						</div>
					</div>

				</form>
				</>

				)}

		</div>
	)
}

export default EditPage