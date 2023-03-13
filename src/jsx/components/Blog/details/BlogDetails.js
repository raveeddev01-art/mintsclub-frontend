import React, { useEffect, useState } from "react";
// Material Ui Components
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import styles from "./blog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ss from "../../assets/images/ss.png";
import { faCalendarDays, faCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import parse from "html-react-parser";
import draftToHtml from "draftjs-to-html";
import { useParams } from "react-router-dom";

const Blogsinglepage = () => {
  const [blog, setBlog] = useState({
    read: "",
    heading: "",
    image: "",
    description: "",
    date: null,
  });
  const { id } = useParams();
  // let location = useLocation()
  const fetchBlogDetails = async () => {
    const authToken = (await localStorage.getItem("authToken")) || "";
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `blog/getBlogDetails/${id}`,
        headers: {
          "x-auth-token": authToken,
        },
      });

      const date = new Date(res.data?.date);
      const month = date.toLocaleString("default", { month: "long" });
      const fullDate = month + " " + date.getDate() + "," + date.getFullYear();
      let resp = { ...res.data };
      resp.date = fullDate;
      setBlog(resp);
    } catch (error) {
      console.log("error =====>", error);
    }
  };
  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <>
      <Container>
        <Box className={styles.blogsingle}>
          <Box className={styles.maxWidth}>
            <Typography component="h3" className={styles.pageTitle}>
              {blog.heading}
            </Typography>
            <Box sx={{ my: 4, display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon className={styles.cal} icon={faCalendarDays} />
                <Typography
                  component="p"
                  className={styles.bloginfo}
                  sx={{ ml: 1 }}
                >
                  {blog?.date}
                </Typography>
              </Box>
              <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon className={styles.cir} icon={faCircle} />
                <Typography
                  component="p"
                  className={styles.bloginfo}
                  sx={{ ml: 1 }}
                >
                  {blog?.read}min Read
                </Typography>
              </Box>
            </Box>
            <Box
              component="img"
              src={blog?.image}
              className={styles.featureImg}
            ></Box>
            <Box className={styles.content} sx={{ mt: 5 }}>
              {blog?.description !== "" &&
                parse(draftToHtml(JSON.parse(blog?.description)))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Blogsinglepage;
