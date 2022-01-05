import React from 'react';
import { ENV } from '../../config/config'
import './nft-preview.css'
const itemPlaceholderImg = ENV.globalPlaceholderImage

const NFTPreview = (props) => {
    return (
       
        <div className="card preview-nft-card no-hover text-center">
            <div className="image-over">
                <img id="nft-image" className="card-img-top" src={props.image ? props.image : itemPlaceholderImg} alt="NFT image" />
            </div>
            <div className="card-caption col-12 p-0">
                <div className="card-body p-0 m-0">
                    {/* <h5 className="mb-3">{props.name}</h5> */}
                    {/* <p>{props.sold ? props.sold : 0} of {props.copies ? props.copies : 0} Copies</p> */}
                    <p className="text-left nft-name-text mt-4">{"name"}</p>
                    <div className="d-flex justify-content-between">

                    <p className="text-white celo-text">{props.currentPrice ? props.currentPrice : 0}{ENV.currency}</p>
                    <p className="text-white">{"10/10"}</p>
                    </div>
                    <div className="input-group">
                        <div className="input-group-append">
                            <button><i className="icon-docs" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default NFTPreview;