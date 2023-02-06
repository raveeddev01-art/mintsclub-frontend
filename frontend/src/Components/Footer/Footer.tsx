import React, { useState, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { firstInputCharacterSpace } from '../../utils/functions';
import EmailIcon from '../../assets/images/mailbox-icon.svg';
import './Footer.scss';
import { toast } from 'react-toastify';
import { footerInt } from '../../interfaces/components';
import { useInsertData } from '../../hooks/Common';

const Footer: FC<footerInt> = () => {
	const [email, setEmail] = useState<any>('');

	const { isLoading, mutate: subscribeUser } = useInsertData(
		'users/subscribe',
		(res: any) => {
			if (res.data.success) {
				toast.success('Subscribed successfully');
			} else {
				toast.info(res?.data?.message);
			}
		}
	);

	const subscribe = () => {
		if (email.trim() === '') {
			return toast.error('Please enter an email to subscribe');
		}
		if (validateEmail(email)) {
			subscribeUser({ email });
		} else {
			toast.error('Please enter a valid email address');
		}
	};

	const validateEmail = (email: any) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const location = useLocation();
	return (
		<footer className="footer-area">
			<div className="footer-top">
				<div className="container">
					<div className="row justify-content-center justify-content-lg-between">
						<div className="col-12 col-md-3 col-lg-2 res-margin  text-center  text-md-start">
							<div className="footer-items">
								<h4 className="footer-title">{'Who Are We?'}</h4>
								<ul>
									<li>
										<Link to="/aboutus">About Us</Link>
									</li>
									<li>
										<Link to="/faqs">FAQs</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-12 col-md-3 col-lg-2 res-margin text-center  text-md-start">
							<div className="footer-items">
								<h4 className="footer-title">{'Join MintsClub'}</h4>
								<ul>
									<li>
										<Link to="/connect-wallet">Sign Up / In</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-12 col-md-3 col-lg-2 res-margin text-center  text-md-start">
							<div className="footer-items">
								<h4 className="footer-title">{'Quick Links'}</h4>
								<ul>
									{location.pathname !== '/connect-wallet' &&
										location.pathname !== '/connect-wallet' && (
											<>
												<li>
													<Link to="/auctions">Live Auction</Link>
												</li>
												<li>
													<Link to="/popular-collections">
														Popular Collections
													</Link>
												</li>
											</>
										)}
									<li>
										<Link to="/privacypolicy">Privacy Policy</Link>
									</li>
									<li>
										<Link to="/termsandconditions">Terms & Conditions</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-12 col-sm-8 col-md-6 col-lg-4 res-margin">
							<div className="footer-items footer-notify-item text-center text-lg-end">
								<h4 className="footer-title">
									Never Miss The NFT Beat! <br /> Subscribe To Our Latest News
								</h4>
								<div className="notify-form">
									<div className="email-icon">
										<img src={EmailIcon} alt="mail-box" />
									</div>
									<input
										type="email"
										maxLength={50}
										onKeyDown={(e) => firstInputCharacterSpace(e, email)}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="youremail@xyz.com"
									/>
									<div>
										<button
											type="submit"
											className="input-group-text"
											id="basic-addon1"
											disabled={isLoading}
											onClick={() => subscribe()}
										>
											{isLoading ? (
												<div
													className="spinner-border footer-loader"
													role="status"
												>
													<span className="sr-only">Loading...</span>
												</div>
											) : (
												'Subscribe'
											)}
										</button>
									</div>
								</div>
								{/* <p>{data.desc}</p> */}
								<div className="social-icons d-flex justify-content-center justify-content-lg-end">
									<a
										href={'https://www.linkedin.com/showcase/mints-club'}
										target="_blank"
										rel="noreferrer"
									>
										<i className={'fab fa-linkedin-in'} />
									</a>
									<a
										href={'https://www.facebook.com/MintsClub.io/'}
										target="_blank"
										rel="noreferrer"
									>
										<i className={'fab fa-facebook-f'} />
									</a>
									<a
										href={'https://www.instagram.com/mintsclub/'}
										target="_blank"
										rel="noreferrer"
									>
										<i className={'fab fa-instagram'} />
									</a>
									<a
										href={'https://twitter.com/MintsClub'}
										target="_blank"
										rel="noreferrer"
									>
										<i className={'fab fa-twitter'} />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="copyright-text">
								© 2022 All rights reserved by mintsclub.io
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps, {})(Footer);
