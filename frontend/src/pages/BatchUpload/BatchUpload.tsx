import { useState } from "react";
import { useInsertData } from "../../hooks/Common";

const BulkUpload = () => {
  const [file, setFile] = useState<any>("");
  const { mutate: uploadFolder } = useInsertData("nfts/batchUpload", () =>
    console.log("uploaded successfully")
  );
  const uploadFile = () => {
    console.log(file, "file");
    let formData: any = new FormData();
    formData.append("batchUpload", file);
    uploadFolder(formData);
  };

  return (
    <>
      <label className="w-100">
        <input
          type="file"
          name="batchUpload"
          style={{ display: "none" }}
          onChange={(e: any) => setFile(e.target.files[0])}
        />
        <span>upload file</span>
      </label>
      <button onClick={() => uploadFile()}>Upload</button>
    </>
  );
};
export default BulkUpload;
