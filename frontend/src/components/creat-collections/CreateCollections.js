import React from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import Breadcrumb from "../breadcrumb/breadcrumb";
import "./CreateCollections.css";
import { editImages } from "../../assets/assets";
import { ReactComponent as ProfileEditSVG } from "../../assets/images/edit-pen.svg";
import CollectionUploadIcon from "../../assets/images/collection-upload-icon.svg";
const CreateCollections = () => {
  return (
    <>
      <NavbarMain />
      <Breadcrumb title1={"Collections"} title2={"CreateCollections"} />
      <section className="edit-profile padding-wrapper create-collection-container">
        <form>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="intro">
                  <div className="intro-content">
                    <span>Create Now</span>
                    <h3 className="mb-0">Create New Collection</h3>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-8 col-lg-4 col-xl-3">
                <div className="edit-inp-subheading">
                  <h6>Logo Image</h6>
                </div>
                <div className="collection-logo-container pt-2">
                  <div className="colection-avatar"></div>
                  <label>
                    <div className="avatar-btn-pen">
                      <ProfileEditSVG />
                    </div>
                    <input
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      style={{ display: "none" }}
                      name="image"
                    />
                  </label>
                </div>
                <div className="">
                  <div className="edit-inp-subheading">
                    <h6>Featured Image</h6>
                  </div>
                  <div className="upload-featured-container">
                    <div className="upload-featured-img">
                      <div>
                        <img src={CollectionUploadIcon} alt="upload-icon" />
                      </div>
                      <div className="upload-featured-img-content pt-2">
                        <h6 className="pb-1">Browse Files</h6>
                        <p>PNG, GIF, WEBP, MP4 or MP3 Max 100mb.</p>
                      </div>
                    </div>
                    <label>
                      <input
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        style={{ display: "none" }}
                        name="banner"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-8 col-xl-9 pt-5 pt-lg-0">
                <div className="row g-4">
                  <div className="col-md-4 col-lg-4">
                    <div className="edit-inp-subheading">
                      <h6>Name</h6>
                    </div>
                    <div className="edit-inp pt-4">
                      <input
                        name="name"
                        placeholder="Name"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="edit-inp-subheading">
                      <h6>URL</h6>
                    </div>
                    <div className="edit-inp pt-4">
                      <input name="url" placeholder="URL" autocomplete="off" />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="edit-inp-subheading">
                      <h6>Select Category</h6>
                    </div>
                    <div className="edit-inp pt-4">
                      <select>
                        <option value="" className="d-none">
                          Select Collection
                        </option>
                        <option>Music</option>
                        <option>Art</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="edit-inp-subheading pt-4">
                      <h6>Discription</h6>
                    </div>
                    <div className="edit-inp pt-4">
                      <textarea
                        name="discription"
                        placeholder="Discription"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4 mt-md-5 text-center">
                <div className="">
                  <button className="btn btn-linear-gradient">
                    Create Collections
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default CreateCollections;
