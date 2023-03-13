import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Tooltip } from "@material-ui/core";
import { Edit } from '@material-ui/icons'
import { useSelector, useDispatch } from "react-redux";
// import { updateMe } from "../../redux/actions/UserActions";
import ButtonLoader from "../../components/common/buttonLoader";
import { Formik } from "formik";
import { getLoggedInUser, updateMe } from "../../../store/reducers/userReducer";
import { fileUpload } from "../../../Helper/common";

const UpdateProfile = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.userReducer?.user);
    const [loading, setLoading] = useState(false);

    const [previewImg, setPreviewImg] = useState('');
    const [initialValues, setInitialValues] = useState({
        fullName: "",
        email: "",
    });
    const [file, setFile] = useState('');

    useEffect(() => {
        setInitialValues({
            fullName: user?.fullName,
            email: user?.email,
        })
        user?.avatar && setPreviewImg(user?.avatar)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    console.log(initialValues)

    const handleSelectedFile = (e) => {
        setFile(e.target.files)
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
    };

    const getLoggedInUserDetail = async () => {
        await dispatch(getLoggedInUser());
    }

    useEffect(() => {
        getLoggedInUserDetail()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email";
        }

        if (!values.fullName) {
            errors.fullName = "Name is required";
        }

        return errors;
    };

    const submitForm = async (values, { resetForm }) => {
        setLoading(true);
        const blogImage = file && file[0] && await fileUpload(file[0])


        let data = {
            ...values,
            avatar: (file && file[0]) ? blogImage : (user?.avatar || '')
        }
        await dispatch(updateMe(data));
        setLoading(false)
    };

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Update Profile</h4>
            </div>
            <div className="card-body">
                <div className="basic-form">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validate={validate}
                        onSubmit={submitForm}
                    >
                        {(formik) => {
                            const {
                                values,
                                handleChange,
                                handleSubmit,
                                errors,
                                touched,
                                handleBlur,
                            } = formik;
                            return (
                                <form onSubmit={handleSubmit}>

                                    <Grid container>
                                        <Grid
                                            container
                                            justify="center"
                                            className={classes.center}
                                        >
                                            <Avatar src={previewImg} className={classes.avatar} />
                                        </Grid>
                                        <Grid
                                            container
                                            justify="center"
                                            className={classes.center}
                                        >

                                            <>
                                                <label className="profile_image">
                                                    <input
                                                        type="file"
                                                        className="profile_image_input"
                                                        style={{ display: "none" }}
                                                        accept="image/*"
                                                        onChange={handleSelectedFile}

                                                    />
                                                    <div className={classes.cardButtonSelected}>
                                                        <Tooltip title="Change Image">
                                                            <Edit size={20} />
                                                        </Tooltip>
                                                    </div>
                                                </label>
                                            </>

                                        </Grid>
                                        <Grid item xs={12}>

                                            <div className="form-group">
                                                <label className="mb-1">
                                                    <strong>Name</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="fullName"
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.fullName && touched.fullName && (
                                                    <span className="error">{errors.fullName}</span>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>

                                            <div className="form-group">
                                                <label className="mb-1">
                                                    <strong>Email</strong>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.email && touched.email && (
                                                    <span className="error">{errors.email}</span>
                                                )}
                                            </div>
                                        </Grid>

                                        <Grid item xs={12}>

                                            <div className="mt-3 mt-sm-10">
                                                <ButtonLoader loader={loading} title={'Update Profile'} classes="btn btn-primary mb-2"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>

    );
};

export default UpdateProfile;




const useStyles = makeStyles((theme) => ({
   
    cardButtonSelected: {
        cursor: "pointer",
        width: "4em",
        height: "4em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        '&:hover': {
            backgroundColor: "#36e799",
            color: "#FFFFFF",
            marginTop: '-45px'

        },
        color: '#000',
        // backgroundColor: "#3f51b5",
        zIndex: 2,
        position: 'relative',
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: "10px",
        lineHeight: "10px",
        marginTop: '-40px'
        // margin: "10px 10px 0px 0px"
    },
    avatar: {
        height: "120px !important",
        width: "120px !important",
        lineHeight: "100px",
        // boxShadow: "0 6px 20px 0 rgba(0,0,0,.19), 0 8px 17px 0 rgba(0,0,0,.2)",
    },
    center: {
        display: "flex",
        justifyContent: "center",
        padding: "0px 0px 5px 0px",
    },
}));