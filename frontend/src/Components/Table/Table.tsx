import React, { Fragment, useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';

import { BiTransferAlt } from 'react-icons/bi';

import { BsTagFill } from 'react-icons/bs';

import { FaHandPaper } from 'react-icons/fa';

import ReactTimeAgo from 'react-time-ago';

import { TableInterface } from '../../interfaces/components';
import moment from 'moment';
const Table: React.FC<TableInterface> = ({
	titles,
	data,
	lowestNftPrice,
	exchangeRate,
	status,
}) => {
	const [info, setInfo] = useState<any>(null);
	useEffect(() => {
		if (status === 'offer') {
			formateBidsInfo();
		} else {
			formateActivityInfo();
		}
	}, [data]);

	const getPercentageChange = (oldNumber: number, newNumber: number) => {
		const decreaseValue = oldNumber - newNumber;

		return (decreaseValue / oldNumber) * 100;
	};

	const handleAcitivityIcon = (type: string) => {
		if (type === 'Mint') {
			return <MdShoppingCart />;
		} else if (type === 'List') {
			return <BsTagFill />;
		} else if (type === 'Bid') {
			return <FaHandPaper />;
		} else {
			return <BiTransferAlt />;
		}
	};

	const formateBidsInfo = () => {
		if (data && data.length > 0) {
			const formatedData = data.map((item: any) => {
				return {
					item1: item.bidAmount,
					item2: `$ ${(item.bidAmount * exchangeRate).toFixed(2)}`,
					item3: `${
						Number(
							getPercentageChange(item.bidAmount, lowestNftPrice).toFixed(0)
						) %
							item.bidAmount >
						lowestNftPrice
							? 'above'
							: 'below'
					}`,
					item4: `${
						item.fromAddress.slice(0, 4) + '...' + item.fromAddress.slice(-4)
					}`,
					item5: (
						<div>
							<ReactTimeAgo
								date={moment(item.createdAt).toDate()}
								locale="en-US"
							/>
						</div>
					),
				};
			});
			setInfo(formatedData);
		}
	};

	const formateActivityInfo = () => {
		if (data && data.length > 0) {
			const formatedData: any = data.map((item: any) => {
				console.log('this is moment data', moment(item.createdAt).toDate());
				return {
					item1: (
						<div className="d-flex align-items-center">
							{handleAcitivityIcon(item.activityType)}
							<p className="ps-1"> {item.activityType} </p>
						</div>
					),
					item2: item.price,
					item3: `${
						item.fromAddress
							? item.fromAddress.slice(0, 4) +
							  '...' +
							  item.fromAddress.slice(-6)
							: 'Null address'
					}`,
					item4: `${
						item.toAddress
							? item.toAddress.slice(0, 4) + '...' + item.toAddress.slice(-4)
							: ''
					}`,
					item5: (
						<div>
							<ReactTimeAgo
								date={moment(item.createdAt).toDate()}
								locale="en-US"
							/>
						</div>
					),
				};
			});
			setInfo(formatedData);
		}
	};
	return (
		<div className="table-container">
			<table className="table table-borderless">
				{data && data.length > 0 && (
					<thead>
						<tr>
							{titles.map((item: any, index: any) => {
								return (
									<th scope="col" key={index}>
										{item}
									</th>
								);
							})}
						</tr>
					</thead>
				)}
				<tbody>
					{info && info.length > 0 ? (
						<>
							{info.map((val: any, index: any) => {
								return (
									<tr key={index}>
										<th scope="row">{val.item1}</th>
										<td>{val.item2}</td>
										<td>{val.item3}</td>
										<td>{val.item4}</td>
										{val.item5 && <td>{val.item5}</td>}
									</tr>
								);
							})}
						</>
					) : (
						<tr>
							<td>
								<Fragment>
									<div className="text-center d-flex justify-content-center align-items-center">
										{` No ${status} found`}
									</div>
								</Fragment>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
export default Table;
