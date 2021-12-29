import React, {useState} from "react";
import AddBtnImage from "../../../../assets/images/Add Button.svg";
import PropertiesModal from "../../../../components/PropertiesModal/ProppertiesModal";
const PropertyModal = (props)=>{
debugger
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return(
      <>
        <img
          src={AddBtnImage}
          onClick={() => handleOpen()}
          className="ml-3"
          style={{ height: "1.5rem", cursor: "pointer" }}
        />
        <PropertiesModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        propertiesValues={JSON.parse(JSON.stringify(props.propertiesValues))}
        onSubmit={props.onSubmit}
      />
      </>
    )
}
export default PropertyModal;