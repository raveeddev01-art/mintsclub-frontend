import React, {useState} from "react";
import AddBtnImage from "../../../../assets/images/Add Button.svg";
import LevelsModal from "../../../../components/LevelsModal/LevelsModal";
const LevelModal = (props)=>{
debugger
const [openLevelModal, setOpenLevelModal] = useState(false);

  const handleOpenLevel = () => setOpenLevelModal(true);
  const handleCloseLevel = () => setOpenLevelModal(false);
    return(
      <>
        <img
          src={AddBtnImage}
          onClick={() => handleOpenLevel()}
          className="ml-3"
          style={{ height: "1.5rem", cursor: "pointer" }}
        />
        {/* <PropertiesModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        propertiesValues={JSON.parse(JSON.stringify(props.propertiesValues))}
        onSubmit={props.onSubmit}
      /> */}
      <LevelsModal
        open={openLevelModal}
        handleOpen={handleOpenLevel}
        handleClose={handleCloseLevel}
        levelsInputs={props.levels}
        onSubmitLevels={props.onSubmitLevels}
      />
      </>
    )
}
export default LevelModal;