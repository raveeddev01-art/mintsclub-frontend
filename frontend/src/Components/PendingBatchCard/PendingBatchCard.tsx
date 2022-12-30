import React from 'react';
import './PendingBatchCard.scss';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import { Images, CollectionImages } from '../../assets/assets';
import { PENDING_BATCH_CARD_INTERFACE } from '../../interfaces/allnfts/interface';
import { STATUS_COLOR, STATUS_TEXT } from '../../utils/helpers/helpers';
import { STATUS_TYPE } from '../../interfaces/allnfts/types';

const PendingBatchCard = ({
	batchInformation,
}: PENDING_BATCH_CARD_INTERFACE) => {
	return (
		<Card className="pending-batch-container">
			<CardActionArea>
				<CardMedia
					className="card-media"
					component="img"
					height="140"
					image={
						batchInformation?.collectionId?.logo ||
						batchInformation?.collectionId?.banner ||
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
								<Typography className="value">
									{batchInformation?.collectionId?.name || 'No Name'}
								</Typography>
							</Typography>
							<Typography component="div" className="information-item">
								<Typography className="label">File Name: </Typography>
								<Typography className="value">
									{batchInformation?.fileName}
								</Typography>
							</Typography>
							<Typography component="div" className="information-item">
								<Typography className="label">Files Processed: </Typography>
								<Typography className="value">
									{`${batchInformation?.processedFiles?.total || 0} Files`}
								</Typography>
							</Typography>
							{batchInformation?.message &&
								batchInformation?.status?.toLowerCase() === 'failed' && (
									<Typography component="div" className="information-item">
										<Typography className="label">Failure Reason: </Typography>
										<Typography className="value">
											{batchInformation?.message}
										</Typography>
									</Typography>
								)}
						</Typography>
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default PendingBatchCard;
