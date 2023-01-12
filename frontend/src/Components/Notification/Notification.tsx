import React from 'react';
import './Notification.scss';
import { useHistory } from 'react-router';
import { handleRequest } from '../../utils/functions';
const Notification = (props: any) => {
	const history = useHistory();
	const dd: any = props.notificationData.data;
	const types = props.notificationData.data.map(
		(notification: any) => notification.type
	);
	const fromUserId = props.notificationData.data.map(
		(notification: any) => notification.fromUserId
	);
	const nftId = props.notificationData.data.map(
		(notification: any) => notification.nftId
	);
	const isSeen = props.notificationData.data.map(
		(notification: any) => notification.isSeen
	);
	const notificationId = props.notificationData.data.map(
		(notification: any) => notification._id
	);
	const NOTIFICATION_TEXT: any = {
		addBid: {
			title: 'Bid Added',
			descritption:
				"'--formUserID--' have placed a bid on your auction of --nftId--",
		},
		upBid: {
			title: 'Up Bided',
			descritption: "'--formUserID--' have placed bid from last higher bid",
		},
		startAuction: {
			title: 'Start Auction Time',
			description: 'Aucton time started of --auctionId--',
		},
		endAuction: {
			title: 'End Auction Time',
			description: 'Aucton time ended of --auctionId--',
		},
	};
	let path = `explore/nftdetail/`;
	const pathName = window.location.pathname;
	const pathNames = pathName.split('/');
	if (pathNames[1] === 'explore' && pathNames[2] === 'nftdetail') {
		path = '/';
	} else if (pathNames[1] === 'explore') {
		path = 'nftdetail/';
	}

	const getNotificationDescription = (
		types: any,
		fromUserId: any,
		nftId: any[]
	) => {
		return NOTIFICATION_TEXT[types]?.descritption
			.replace('--formUserID--', fromUserId)
			.replace('--nftId--', nftId);
	};

	const updateNotification = async (i: any) => {
		history.push(`${path}${nftId[i]._id}`);
		console.log('This is notificationId: ', notificationId[i]);
		const payload: any = { _id: notificationId[i], isSeen: true };
		const res = await handleRequest(
			'put',
			`notification/updateUserUnseenNotification`,
			payload
		);
		if (res.data.success) {
			console.log('Is Seen updated successfully');
		}
	};
	// console.log('if data present:', types.isSeen);
	return (
		<div>
			<div className="popup">
				<div className="notification-data">
					{types ? (
						types.map((type: any, i: any) => (
							<div
								className={
									isSeen[i] === true ? 'changeBackgroud' : 'notifications'
								}
								onClick={() => updateNotification(i)}
								key={i}
							>
								{getNotificationDescription(
									type,
									fromUserId[i].address,
									nftId[i].name
								)}
							</div>
						))
					) : (
						<div>No Record Found...</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Notification;
