import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
// import Products from "./Products";
import { creteBlogs } from "../../../../../store/reducers/blogReducer";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fileUpload } from "../../../../../Helper/common";
import ButtonLoader from "../../../common/buttonLoader";
import PageTitle from "../../../../layouts/PageTitle";
import { alert } from "../../../../../store/reducers/alertSlice";
const BlogsForm = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [formValues, setFormValues] = useState({
    title: "",
    read: "",
    description: "",
    image: "test Image",
  });
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const [showAlert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let err = {};

    if (!formValues.title) {
      err.title = "Title is required";
    }
    if (!formValues.read) {
      err.read = "Read time is required";
    }

    if (
      (editorState &&
        !editorState.getCurrentContent().getPlainText("\u0001")) ||
      editorState.getCurrentContent().getPlainText("\u0001").trim() === ""
    ) {
      err.description = "Description is required";
    }

    if (!files && !files[0]) {
      err.image = "Image is required";
    } else if (files && files[0]?.type.split("/")[0] !== "image") {
      err.image = "Please provide a valid image";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      return setErrors(err);
    }

    setLoading(true);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const contentState = editorState.getCurrentContent();
    let stateData = await JSON.stringify(convertToRaw(contentState));
    const blogImage = await fileUpload(files[0]);
    const raw = {
      image: blogImage,
      heading: formValues.title,
      description: stateData || "",
      read: formValues.read,
      date: new Date(),
    };
    const data = await dispatch(creteBlogs(raw));
    if (data) {
      dispatch(
        alert({
          title: `Success`,
          message: `Blog Created Successfully`,
          severity: "success",
        })
      );
      setTimeout(() => {
        setAlert(false);
        document.getElementById("create-blog-form").reset();
      }, 3000);
    }
    if (data?.heading) {
      setFormValues({
        title: "",
        read: "",
        description: "",
        image: "test Image",
      });
      setEditorState(EditorState.createEmpty());
      setFiles([]);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: undefined });
    if (name === "image") {
      setFiles(e.target.files);
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onEditorStateChange = (e) => {
    setErrors({ ...errors, description: undefined });
    setEditorState(e);
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Create" motherMenu="Blogs" />
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Create Blog</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form
                  id="create-blog-form"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-default "
                      name="title"
                      placeholder="Title"
                      value={formValues.title}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    {errors.title && (
                      <span className="error">{"Title is required"}</span>
                    )}
                  </div>
                  <div
                    style={{ paddingLeft: 0 }}
                    className="col-xl-4 col-lg-4 form-group"
                  >
                    <input
                      type="number"
                      min="0"
                      className="form-control input-default "
                      name="read"
                      placeholder="Read Time"
                      value={formValues.read}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    {errors.read && (
                      <span className="error">{"Read time is required"}</span>
                    )}
                  </div>
                  <div
                    className="form-group"
                    style={{
                      border: "1px solid #F8F8F8",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={onEditorStateChange}
                    />

                    {errors.description && (
                      <span className="error">{"Description is required"}</span>
                    )}
                  </div>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        name="image"
                        type="file"
                        className="custom-file-input"
                        onChange={handleChange}
                        accept=".png, .jpg, .jpeg, .webp"
                      />
                      <label className="custom-file-label">
                        {files && files[0]
                          ? files && files[0]?.name
                          : `Choose file`}
                      </label>
                    </div>
                  </div>
                  {errors.image && (
                    <span className="error">{"Valid Image is required"}</span>
                  )}
                  <div className="mt-3 mt-sm-10">
                    <ButtonLoader
                      loader={loading}
                      title={"Create Blog"}
                      classes="btn btn-primary mb-2"
                      disabled={loading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogsForm;
