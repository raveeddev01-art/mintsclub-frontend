import React,{useState} from "react";
import "./FilterComponent.css";

const FilterComponent = ({
  Status,
  Chains,
  Collections,
  onChangeMinPrice,
  onChangeMaxPrice,
  minValue,
  maxValue,
  applyMinMaxFilter,
  collectionsLabel,
  handleCollectionsFilter,
  handleStatusFilter,
  disabled
}) => {
  const [activeStatus,setActiveStatus]=useState('')
  const [activeCollection,setActiveCollection]=useState('')

  return (
    <div className="collection-filter-accordion">
      <div className="accordion accordion-flush " id="accordionFlushExample">
        {Status ? (
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
                
              >
                {Status.label}
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
            >
              <div className="accordion-body">
                <div className="d-flex flex-column">
                  {Status.option &&
                    Status.option.map((Status) => {
                      return (
                        <button
                        className={`${Status===activeStatus?"active-class":""}`}
                         onClick={() => {handleStatusFilter(Status);setActiveStatus(Status)}}
                         disabled={disabled}
                         
                         >

                          {Status}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Price
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
          >
            <div className="accordion-body">
              <div className="d-flex flex-column ">
                <div className="filter-min-max d-flex align-items-center justify-content-center mb-1">
                  <p>Min:</p>
                  <input
                    type="number"
                    value={minValue}
                    onChange={onChangeMinPrice}
                  />
                </div>
                {/* <span className="text-center my-1">To</span> */}
                <div className="filter-min-max d-flex align-items-center justify-content-center mt-1">
                  <p>Max:</p>
                  <input
                    type="number"
                    value={maxValue}
                    onChange={onChangeMaxPrice}
                  />
                </div>

                <button
                  className="mt-3 apply-btn"
                  onClick={() => applyMinMaxFilter()}
                  disabled={disabled}
                 
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {Chains ? (
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                {Chains.label}
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
            >
              <div className="accordion-body">
                <div className="d-flex flex-column">
                  {Chains.option &&
                    Chains.option.map((Chains) => {
                      return <button  disabled={disabled}>{Chains}</button>;
                    })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {Collections ? (
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              {collectionsLabel && (
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                 
                >
                  {collectionsLabel}
                </button>
              )}
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
            >
              <div className="accordion-body collections-accordion-body">
                <div className="d-flex flex-column">
                  {Collections &&
                    Collections.length > 0 &&
                    Collections.map((collection) => {
                      return (
                        <button
                        className={`${collection._id===activeCollection?"active-class":""}`}
                          onClick={() =>
                            {handleCollectionsFilter(collection._id);setActiveCollection(collection._id)}
                          }
                          disabled={disabled}
                        >
                          {collection.name}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              On sale in
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFour"
          >
            <div className="accordion-body">
              <div className="d-flex flex-column">
                <button className="active-class">ETH</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
