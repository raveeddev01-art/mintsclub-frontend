import React from 'react';
import './Notification.scss';
import { useHistory } from 'react-router';

const Notification = (props: any) => {
	const type = props.notificationData.data.map(
		(notification: any) => notification.type
	);
	const fromUserId = props.notificationData.data.map(
		(notification: any) => notification.fromUserId
	);
	const nftId = props.notificationData.data.map(
		(notification: any) => notification.nftId
	);
	const NOTIFICATION_TEXT: any = {
		addBid: {
			title: 'Bid Added',
			descritption: `--formUserID-- have placed a bid on your auction of --nftId--`,
		},
		upBid: {
			title: 'Up Bided',
			descritption: `'--formUserID--' have placed bid from last higher bid`,
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

	const history = useHistory();
	const getNotificationDescription = (
		type: any,
		fromUserId: any,
		nftId: any
	) => {
		return NOTIFICATION_TEXT[type]?.descritption
			.replace('--formUserID--', fromUserId)
			.replace('--nftId--', nftId);
	};

	return (
		<div>
			<div className="popup">
				<div className="notification-data">
					{type.map((t: any, i: any) => (
						<div
							className="notifications"
							onClick={() => history.push(`${path}${nftId[i]}`)}
							key={i}
						>
							{getNotificationDescription(t, fromUserId[i], nftId[i])}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Notification;
