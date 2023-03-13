import CircularProgress from '@material-ui/core/CircularProgress';

 const ButtonLoader = ({ loader, classes, title, disabled, loaderStyle={color: '#fff'}, btnStyle ={ minWidth: 120, cursor: disabled ? 'not-allowed' : 'pointer'  } }) => {
    return (

        <button
            type="submit"
            className={classes}
            disabled={disabled}
            style={btnStyle}
        >
            {loader ? <CircularProgress style={loaderStyle} size={15} className={'loader'} /> : title}
        </button>
    )

}

export default ButtonLoader;