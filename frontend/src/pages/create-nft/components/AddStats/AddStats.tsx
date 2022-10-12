import StatsInfo from "../statsinfo";


const AddStats=({data}:any)=>{
    const {setState,AddIcon,nft}=data
    return (
        <div className="col-12 col-lg-6 mt-3 ">
        <label className="create-collection-label">Stats:</label>
        <div className="create-collection-input mt-2 d-flex align-items-center justify-content-between">
          <div className="properties-content">
            <p>Add Stats</p>
          </div>
          <div className="properties-btn">
            <button
              onClick={() => {
                setState({
                  statsmodalShow: true,
                });
              }}
            >
              <img src={AddIcon} alt="add" />
            </button>
          </div>
        </div>
        <div className="nft-stat-container mx-2 mt-3">
          {nft.stats.map(
            (item: { name: any; value: any }) => {
              return (
                <StatsInfo name={item.name} value={item.value} />
              );
            }
          )}
        </div>
      </div>
    )
}
export default AddStats