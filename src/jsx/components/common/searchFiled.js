import Search from '@material-ui/icons/Search';

const SearchField = ({onChange, searchText,handleSearch }) => {
    

   return ( <div className="header-left mb-3">

        <div className="search_bar dropdown show" style={{ float: 'right !important' }}>

            <input
                className="form-control"
                type="search"
                placeholder="Search Here"
                aria-label="Search"
                onChange={onChange}
                value={searchText}
                onKeyDown={e => e.keyCode === 13 && handleSearch()}
            />
            <span
                className="search_icon p-3 c-pointer"
                data-toggle="dropdown"
                onClick={handleSearch}
            >
                <Search />
            </span>
        </div>
    </div>)
}
export default SearchField