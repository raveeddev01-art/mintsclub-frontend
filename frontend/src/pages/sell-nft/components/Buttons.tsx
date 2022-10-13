const Buttons = ({ data }: any) => {
  const {
    activeBtn,
    setActiveBtn,
    setSellingMethod,
    setCopies,
    setCopiesError,
    nftDetail,
  } = data;
  return (
    <div className="col-12">
      <div className="sale-btn-container mt-5">
        <button
          className={` ${
            activeBtn === 0 ? "sell-btn-active" : "sell-btn-not-active"
          }  me-3 `}
          onClick={() => {
            setActiveBtn(0);
            setSellingMethod(1);
            setCopies("");
            setCopiesError(false);
          }}
        >
          Fixed Price
        </button>
        {nftDetail && !nftDetail?.lazyMinted && (
          <button
            className={` ${
              activeBtn === 1 ? "sell-btn-active" : "sell-btn-not-active"
            } `}
            onClick={() => {
              setActiveBtn(1);
              setSellingMethod(2);
              setCopies("");
              setCopiesError(false);
            }}
          >
            Timed Auction
          </button>
        )}
      </div>
    </div>
  );
};
export default Buttons;
