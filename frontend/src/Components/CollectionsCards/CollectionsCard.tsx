import React, { useState, FC } from 'react';
import { useHistory } from 'react-router';
import { Card } from 'react-bootstrap';
import { Images } from '../../assets/assets';
import ImageLoader from '../ContentLoader/ImageLoader';
import SubImgLoader from '../ContentLoader/CollectionSubLoader';
import { CollectionCardInt } from '../../interfaces/components';
import './CollectionsCard.scss';
import { verifyOwner } from '../../utils/helpers/helpers';
const CollectionsCard: FC<CollectionCardInt> = ({
	CardImg,
	Subimg1,
	Subimg2,
	Subimg3,
	name,
	id,
	collection,
	userName,
	NFTCount,
	profileImage,
	ownerAddress,
	connectedAddress,
	userId,
	blockchainType,
}) => {
	const [loader, setLoader] = useState<any>(true);
	const history = useHistory();
	return (
		<div className="card_wrap">
			<Card
				className="collection-cards-container m-1 mx-auto mx-sm-1"
				onClick={() => {
					history.push({
						pathname: `/collection/detailPage/${id}`,
						state: collection,
					});
				}}
			>
				<div className="row">
					<div className="col-12">
						<div className="row g-3">
							<div className="col-4 collection-subImg1">
								<SubImgLoader
									image={Subimg1 ? Subimg1 : Images.imagePlaceholder}
								/>
							</div>
							<div className="col-4 collection-subImg1">
								<SubImgLoader
									image={Subimg2 ? Subimg2 : Images.imagePlaceholder}
								/>
							</div>{' '}
							<div className="col-4 collection-subImg1">
								<SubImgLoader
									image={Subimg3 ? Subimg3 : Images.imagePlaceholder}
								/>
							</div>
							<div style={{ display: `${loader ? 'block' : 'none'}` }}>
								<ImageLoader />
							</div>
							<div
								className="col-12 collection-mainImg"
								style={{ display: `${!loader ? 'block' : 'none'}` }}
							>
								<img
									src={CardImg}
									onLoad={() => setLoader(false)}
									alt="card-img"
								/>
							</div>
						</div>
						<Card.Body>
							<Card.Title>
								<div>
									{name && name.length > 22 ? name.slice(0, 22) + '...' : name}
								</div>
								<div className="collection-items d-flex align-items-center">
									<span>
										{NFTCount} {NFTCount > 1 ? 'items' : 'item'}
									</span>
								</div>
							</Card.Title>
							<div className="d-flex align-items-center justify-content-between collection-card-footer">
								<div className="collection-footer-left d-flex align-items-center">
									<img
										src={profileImage ? profileImage : Images.placeholderImg}
										alt="avatar-img"
										className="me-2"
									/>
									<p>
										Owned by:{' '}
										<span className="text-capitalize ms-1">
											{verifyOwner(
												ownerAddress,
												connectedAddress,
												blockchainType,
												userName
											)}
										</span>
									</p>
								</div>
							</div>
						</Card.Body>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default CollectionsCard;
