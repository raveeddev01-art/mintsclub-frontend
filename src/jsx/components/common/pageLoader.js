import CircularProgress from '@material-ui/core/CircularProgress';
// import '../../../scss/components/'
import { makeStyles } from '@material-ui/core/styles';

const PageLoader = () => {
    const classes = useStyles();

    return (
        <div className={classes.mainWrapper}>
            <CircularProgress size={30}  />
        </div>
    )

}

export default PageLoader;

const useStyles = makeStyles((theme) => ({
    mainWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40
    }
}));
