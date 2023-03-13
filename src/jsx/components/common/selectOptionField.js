import { makeStyles } from "@material-ui/core/styles";

const SelectOptionField = ({ onChange, filter, options }) => {
    const classes = useStyles();

    return (<div className="header-left pr-3 mb-3">

        <select value={filter} onChange={onChange} className={classes.select} >
            {
                options.map(val => <option value={val?.value} key={`${val?.value}`}>{val?.label}</option>)
            }
        </select>
    </div>)
}
export default SelectOptionField;

const useStyles = makeStyles(theme => ({
    select: {
        height: 56,
        borderRadius:' 0.75rem',
        color: '#6e6e6e !important',
        border: '1px solid #ebebeb',
        marginRight: 10,
        paddingLeft:10,
    }
}));