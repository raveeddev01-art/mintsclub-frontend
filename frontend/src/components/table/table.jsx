import "./table.css";
import { useEffect, useState } from "react";
const Table = ({ titles, data, lowestNftPrice, show, exchangeRate }) => {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    formateBidsInfo();
  }, [data]);
  const getPercentageChange = (oldNumber, newNumber) => {
    var decreaseValue = oldNumber - newNumber;

    return (decreaseValue / oldNumber) * 100;
  };

  const formateBidsInfo = () => {
    if (data && data.length > 0) {
      let formatedData = data.map((item) => {
        return {
          item1: item.bidAmount,
          item2: `$ ${(item.bidAmount * exchangeRate).toFixed(2)}`,
          item3: `${
            getPercentageChange(item.bidAmount, lowestNftPrice).toFixed(0) %
              item.bidAmount >
            lowestNftPrice
              ? "above"
              : "below"
          }`,
          item4: `${
            item.fromAddress.slice(0, 4) + "..." + item.fromAddress.slice(-4)
          }`,
        };
      });
      setInfo(formatedData);
    }
  };
  const formateActivityInfo = () => {};
  return (
    <div className="table-container">
      <table className="table table-borderless">
        {show && data && data.length > 0 && (
          <thead>
            <tr>
              {titles.map((item) => {
                return <th scope="col">{item}</th>;
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {show && info && info.length > 0 ? (
            <>
              {info.map((val, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{val.item1}</th>
                    <td>{val.item2}</td>
                    <td>{val.item3}</td>
                    <td>{val.item4}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <p className="text-center d-flex justify-content-center align-items-center">
              No Offers Found
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
