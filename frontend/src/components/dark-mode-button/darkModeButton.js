import "./darkModeButton.css";
import { connect } from "react-redux";
import { setDarkMode } from "../../redux/actions/actions";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import SunImg from "../../assets/images/sun-fill.svg";

const DarkModeButton = (props) => {
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };
  const storedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDark();
      props.setDarkMode(true);
    } else {
      setLight();
      props.setDarkMode(false);
    }
  };

  return (
    <div className="toggle-theme-wrapper">
      <p>Dark Mode</p>
      <FormGroup>
        <FormControlLabel
          sx={{ mr: 0 }}
          control={
            <Android12Switch
              defaultChecked={defaultDark}
              onChange={toggleTheme}
            />
          }
        />
      </FormGroup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});
export default connect(mapStateToProps, {
  setDarkMode,
})(DarkModeButton);

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .Mui-checked": { color: "#fff" },
  "& .Mui-checked+.MuiSwitch-track": {
    backgroundColor: "#000 !important",
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url(${SunImg})`,
      left: "15px",
      backgroundRepeat: "no-repeat",
      height: "11px",
      width: "11px",
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
