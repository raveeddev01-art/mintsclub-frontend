import React, { FC } from 'react';
import { BannerInterface } from '../../interfaces/components';
import './Banner.scss';

const Banner: FC<BannerInterface> = ({
	subHeading,
	heading,
	content,
	createdby,
	bgImg,
	bannerImg,
	bg,
}) => {
	return (
		<>
			<div
				className="banner-wrapper padding-wrapper"
				style={{ backgroundImage: `url(${bg ? bgImg : ''})` }}
			>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-md-9 col-lg-7">
							<div className="intro">
								<div className="intro-content clr-blue">
									{subHeading && <span>{subHeading}</span>}
									{heading && <h3 className="heading">{heading}</h3>}
									{createdby && (
										<p className="created-by">
											Created by <span>{createdby}</span>
										</p>
									)}
									{content && <p className="">{content}</p>}
								</div>
							</div>
						</div>
						<div className="col-lg-5 d-none d-lg-block">
							<div className="banner-img">
								{bannerImg && <img src={bannerImg} alt="banner-img" />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Banner;
