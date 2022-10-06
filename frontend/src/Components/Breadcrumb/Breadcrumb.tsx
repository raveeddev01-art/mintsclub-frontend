import React, { FC } from 'react';
import { BreadcrumbInt } from '../../interfaces/components';
import './Breadcrumb.scss';

const Breadcrumb: FC<BreadcrumbInt> = ({
	title1,
	title2,
	title3,
	title1Handler,
}) => {
	return (
		<div className="top-breadcrumb ">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="breadcrumb-text d-flex align-items-center ">
							{title1 ? (
								<p onClick={() => title1Handler && title1Handler()}>{title1}</p>
							) : (
								''
							)}
							{title2 ? (
								<p>
									<span className="px-1"> {'>'} </span>
									{title2}
								</p>
							) : (
								''
							)}
							{title3 ? <p>{title3}</p> : ''}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Breadcrumb;
