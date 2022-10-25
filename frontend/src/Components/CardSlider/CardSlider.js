import React, { Component } from 'react';
import Slider from 'react-slick';
import './CardSlider.scss';

const CardSlider = (props) => {
	let slider = Slider;
	const nexts = () => {
		slider.slickNext();
	};
	const previous = () => {
		slider.slickPrev();
	};

	const handleArrows = () => {
		const { data, homeAuctions } = props;
		if (data && data.length > 0) {
			if (homeAuctions && data.length > 4) {
				return true;
			} else if (!homeAuctions && data.length > 4) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
	const { settings } = props;

	return (
		<div className="container">
			{handleArrows() && (
				<div className="text-end">
					<button
						className="card-slider-btn mb-4 me-3"
						onClick={() => previous()}
					>
						<i className="fas fa-arrow-left"></i>
					</button>
					<button className="card-slider-btn mb-4" onClick={() => nexts()}>
						<i className="fas fa-arrow-right"></i>
					</button>
				</div>
			)}
			<Slider ref={(c) => (slider = c)} {...settings}>
				{props.children}
			</Slider>
		</div>
	);
};

export default CardSlider;
