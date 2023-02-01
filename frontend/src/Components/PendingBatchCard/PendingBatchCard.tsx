import React from 'react';
import './PendingBatchCard.scss';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Tooltip,
	Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Images, CollectionImages } from '../../assets/assets';
import { PENDING_BATCH_CARD_INTERFACE } from '../../interfaces/allnfts/interface';
import {
	reduceString,
	STATUS_COLOR,
	STATUS_TEXT,
} from '../../utils/helpers/helpers';
import { STATUS_TYPE } from '../../interfaces/allnfts/types';

const PendingBatchCard = ({
	batchInformation,
}: PENDING_BATCH_CARD_INTERFACE) => {
	return (
		<Card className="pending-batch-container">
			<Tooltip
				title={batchInformation?.message}
				style={{ top: '0', bottom: '0' }}
			>
				<CardActionArea>
					<CardMedia
						className="card-media"
						component="img"
						height="140"
						image={
							batchInformation?.collectionId?.logo?.trim() ||
							batchInformation?.collectionId?.banner?.trim() ||
							CollectionImages?.mainImg3
						}
						alt="collectionCoverOrProfileImage"
					/>
					<CardContent sx={{ padding: '5px' }}>
						<Typography component="div">
							<Typography component="div" className="batch-info">
								<Typography component="div" className="information-item">
									<Typography className="label">Status: </Typography>

									<Typography
										className="value"
										style={{
											fontWeight: 'bold',
											color:
												STATUS_COLOR[
													batchInformation?.status as keyof STATUS_TYPE
												],
										}}
									>
										<span
											className="dot"
											style={{
												backgroundColor:
													STATUS_COLOR[
														batchInformation?.status as keyof STATUS_TYPE
													],
											}}
										/>
										{` ${
											STATUS_TEXT[batchInformation?.status as keyof STATUS_TYPE]
										}`}
									</Typography>
								</Typography>
								<Typography component="div" className="information-item">
									<Typography className="label">Collection Name: </Typography>
									<Tooltip title={batchInformation?.collectionId?.name}>
										<Typography className="value">
											{reduceString(
												batchInformation?.collectionId?.name || 'No Name',
												15
											)}
										</Typography>
									</Tooltip>
								</Typography>
								<Typography component="div" className="information-item">
									<Typography className="label">File Name: </Typography>
									<Tooltip title={batchInformation?.fileName}>
										<Typography className="value">
											{reduceString(batchInformation?.fileName, 15)}
										</Typography>
									</Tooltip>
								</Typography>
								<Typography component="div" className="information-item">
									<Typography className="label">Files Processed: </Typography>
									<Typography className="value">
										{`${batchInformation?.processedFiles?.total || 0} Files`}
									</Typography>
								</Typography>
								{/* {batchInformation?.message &&
								batchInformation?.status?.toLowerCase() === 'failed' && (
									<Typography component="div" className="information-item">
										<Typography className="label">Failure Reason: </Typography>
										<Typography className="value">
											{reduceString(batchInformation?.message, 15)}
										</Typography>
									</Typography>
								)} */}
							</Typography>
						</Typography>
					</CardContent>
				</CardActionArea>
			</Tooltip>
		</Card>
	);
};

export default PendingBatchCard;
