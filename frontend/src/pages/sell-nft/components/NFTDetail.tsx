const NFTDetail=({info}:any)=>{
    const {name,remainingCopies,nftDetail,description}=info
    return (
        <div className='col-lg-6 col-xl-7'>
        <div className='nft-img-detail'>
          <h5>NFT Details:</h5>
        </div>
        <div className='nft-img-detail-box'>
          <div className='nft-detail-rounded-box'>
            <p>
              {name && name.length > 30
                ? name.slice(0, 30) + '...'
                : name}
            </p>
          </div>
          <div className='row g-2 g-sm-4'>
            <div className='col-6 col-sm-4 col-lg-6 col-xl-4'>
              <div className='nft-detail-rounded-box mb-0'>
                <p>
                  Total Copies: <span>{nftDetail?.copies}</span>
                </p>
              </div>
            </div>
            <div className='col-6 col-sm-4 col-lg-6 col-xl-4 '>
              <div className='nft-detail-rounded-box mb-0'>
                <p>
                  Sold:{' '}
                  <span>{nftDetail?.copies - remainingCopies}</span>
                </p>
              </div>
            </div>
            <div className='col-6 col-sm-4 col-lg-6 col-xl-4'>
              <div className='nft-detail-rounded-box mb-0'>
                <p>
                  Remaining: <span>{remainingCopies}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='detail-bg-box nft-img-detail'>
            <h5>Description:</h5>
            <hr />
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
}
export default NFTDetail