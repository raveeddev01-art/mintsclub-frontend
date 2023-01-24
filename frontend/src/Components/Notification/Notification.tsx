import React from 'react';
import './Notification.scss';
import { useHistory } from 'react-router';
import { handleRequest } from '../../utils/functions';
import { NOTIFICATION_TEXT } from '../../utils/helpers/helpers';
import moment from 'moment';
import {
	notificationType,
	notificationFromUserId,
	notificationNftId,
	notificationIsSeen,
	notificationId,
	notificationTime,
} from './variableTypes';
const Notification = (props: any) => {
	const history = useHistory();
	const types = props.notificationData.data.map(
		(notification: notificationType) => notification.type
	);
	console.log('This is Props:', props);
	const fromUserId = props.notificationData.data.map(
		(notification: notificationFromUserId) => notification.fromUserId
	);
	const nftId = props.notificationData.data.map(
		(notification: notificationNftId) => notification.nftId
	);
	const isSeen = props.notificationData.data.map(
		(notification: notificationIsSeen) => notification.isSeen
	);
	const notificationId = props.notificationData.data.map(
		(notification: notificationId) => notification._id
	);
	const notificationTime = props.notificationData.data.map(
		(notification: notificationTime) => notification.createdAt
	);
	let path = `explore/nftdetail/`;
	const pathName = window.location.pathname;
	const pathNames = pathName.split('/');
	if (pathNames[1] === 'explore' && pathNames[2] === 'nftdetail') {
		path = '';
	} else if (pathNames[1] === 'explore') {
		path = 'nftdetail/';
	}

	const getNotificationDescription = (
		types: string,
		address: string,
		name: string
	) => {
		return NOTIFICATION_TEXT[types]?.descritption
			.replace('--formUserID--', address)
			.replace('--name--', name);
	};
	const getNotificationTitle = (types: string) => {
		return NOTIFICATION_TEXT[types]?.title;
	};

	const updateNotification = async (i: number) => {
		history.push(`${path}${nftId[i]._id}`);
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
	return (
		<div>
			<div className="popup">
				<div className="notification-data">
					{types ? (
						types.map((type: string, i: number) => (
							<div
								className={
									isSeen[i] === true ? 'changeBackgroud' : 'notifications'
								}
								onClick={() => updateNotification(i)}
								key={i}
							>
								<div className="Notification-Title">
									{getNotificationTitle(type)}
								</div>
								<div className="Notification-Description">
									{getNotificationDescription(
										type,
										fromUserId[i].address,
										nftId[i].name
									)}
								</div>
								<div className="wrape-content">
									{isSeen[i] === true ? (
										<div className="seen-notification">seen</div>
									) : null}

									<div className="Notification-Time">
										{moment(notificationTime[i]).format('llll')}
									</div>
								</div>
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
