import LevelsInfo from "../levelsinfo";

const AddLevels=({data}:any)=>{
    const {setState,AddIcon,nft}=data
    return (
        <div className="col-12 col-lg-6 mt-3 mt-lg-5">
        <label className="create-collection-label">Levels:</label>
        <div className="create-collection-input mt-2 d-flex align-items-center justify-content-between">
          <div className="properties-content">
            <p>Add Levels</p>
          </div>
          <div className="properties-btn">
            <button
              onClick={() => {
                setState({
                  levelsmodalShow: true,
                });
              }}
            >
              <img src={AddIcon} alt="add" />
            </button>
          </div>
        </div>
        <div className="nft-level-container mx-3 mt-3 ">
          {nft.levels.map(
            (item: { name: any; value: any }) => {
              return (
                <LevelsInfo name={item.name} value={item.value} />
              );
            }
          )}
        </div>
      </div>
    )
}
export default AddLevels