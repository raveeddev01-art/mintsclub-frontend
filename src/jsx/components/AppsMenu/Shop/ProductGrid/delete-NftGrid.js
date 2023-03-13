import React, { Fragment  , useEffect , useState} from "react";
import { useDispatch , useSelector } from 'react-redux'
// import Products from "./Products";

/// Data
// import productData from "../productData";
import PageTitle from "../../../../layouts/PageTitle";
import DataTable from "../../../Dashboard/DataTable";
import { getAllNft } from '../../../../../store/reducers/nftReducer'


const ProductGrid = () => {

   const [nft , setNft] = useState(null);
   const dispatch = useDispatch();
   useEffect(() => {

      const getNftListing = (async () => {

        dispatch(getAllNft());
         
         // const requestOptions = {
         //    method: 'GET',
         //    redirect: 'follow'
         //  };
          
         //  let NftListing = await fetch("http://localhost:5000/listing/getAllNft", requestOptions)
         //    .then(response => response.text())
         //    .then(result => {
         //       return JSON.parse(result)
         //    })
         //    .catch(error => console.log('error', error));
          
         //    setNft(NftListing)
         //    console.log('NftListing ====>' , NftListing)
      })

      getNftListing()

   } , []);

   const data = useSelector((store) => store.nftReducer.nfts)
   return (
      <Fragment>
         <PageTitle activeMenu="Blank" motherMenu="Layout" />
         <div className="row">
            <DataTable tabledata = {data}/>
         </div>
      </Fragment>
   );
};

export default ProductGrid;
