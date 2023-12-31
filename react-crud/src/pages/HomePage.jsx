import {useState, useEffect} from "react"
import axios from "axios"
import Product from "../components/Product"


const HomePage = () => {

	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const getProducts = async()=>{
		try{
			setIsLoading(true)
			const response = await axios.get('https://node-api-xts8.onrender.com/api/products')
			console.log(response.data)
			setProducts(response.data)
			setIsLoading(false)
		}catch(error){

		}
	}

	useEffect(()=>{
		getProducts()
	}, [])
	return(
		<div>
			<div>
				{isLoading ? (
					"Loading"
					): (
					<>
					{products.length > 0 ? (
						<>
						{
							products.map((product, index) =>{
								return (
									<Product key={index} product={product}/>
								)
							})
						}
						</>

						):(
						<div>
							There is no product
						</div>
						)}
					</>
					)}
			</div>
		</div>
	)
}

export default HomePage