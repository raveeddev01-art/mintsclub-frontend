import React from "react";
import { Link } from "react-router-dom";
const tempImage = 'https://qfhf65psmzzuk23swabcb3wrlsolwmmif7gfc3okhedfez5e3y.arweave.net/gU5fdfJmc0Vrcr-ACIO7RXJy7MYgvzFFtyjkGUmek3k?ext=svg'

const MAX_LENGTH = 30;

const Products = ({ product: { fullName , description , image  } }) => {
   return (
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
         <div className="card">
            <div className="card-body">
               <div className="new-arrival-product">
                  <div className="new-arrivals-img-contnent">
                     <img className="img-fluid" src={image || tempImage} alt="" />
                  </div>
                  <div className="new-arrival-content text-center mt-3">
                     Name
                     <h4>
                        {/* <Link to="/ecom-product-detail"> */}
                           {fullName}
                           {/* </Link> */}
                     </h4>
                     {/* {rating}
                     <span className="price">${price}</span> */}
                  </div>
                  <div className="new-arrival-content text-center mt-3">
                    Description
                     <h4>
                        {/* <Link to="/ecom-product-detail"> */}

                           { description && `${description.substring(0, MAX_LENGTH)}...`}
                           {/* </Link> */}
                     </h4>
                     {/* {rating}
                     <span className="price">${price}</span> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Products;
