import "./own-collection-today.css";
import { Images } from "../../../src/assets/assets";
const OwnCollectionToday = () => {
  return (
    <section className="own-collection-today-section">
      <div className="container own-collection-padding">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="own-collection-content text-center  text-lg-start">
              <img src={Images.community} alt="community" />
              <p className="own-collection-title mt-3">
                Join the community,{" "}
                <span>
                  Change <br className="d-none d-sm-block" /> the world.
                </span>
              </p>
              <p className="own-collection-description mt-4 text-center  text-lg-start">
                MintsClub is a shared liquidity NFT market smart contract which
                is used by multiple websites to provide the users the best
                possible experience.
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 mt-5 mt-lg-0">
            <div className="own-collection-content text-center  text-lg-start">
              <img src={Images.ownCollection} alt="community" />
              <p className="own-collection-title mt-3">
                Start your own{" "}
                <span>
                  collection <br className="d-none d-sm-block" />
                  today.
                </span>
              </p>
              <p className="own-collection-description mt-4 text-center  text-lg-start">
                MintsClub is a shared liquidity NFT market smart contract which
                is used by multiple websites to provide the users the best
                possible experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OwnCollectionToday;
