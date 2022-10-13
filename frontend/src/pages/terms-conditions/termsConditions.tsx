import React, { useEffect } from 'react';
import './termsConditions.scss';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg2.png';

const bannerData = {
	subHeading: 'Our Terms & Conditions',
	heading: 'Terms & Conditions',
	content:
		'Explore on the worlds best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.',
};

const TermsConditions = () => {
	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	return (
		<>
			<Banner
				subHeading={bannerData.subHeading}
				heading={bannerData.heading}
				content={bannerData.content}
				bgImg={BannerBg}
				bannerImg={BannerImage}
			/>
			<div className="padding-wrapper terms">
				<div className="container">
					<div className="terms-content mb-lg-5 intro">
						<h5>1. INTRODUCTION</h5>
						<p>
							Welcome to Mints Club NFT Marketplace. These Terms and conditions
							set out the terms on which we offer you access to and use of Mints
							Club NFT Marketplace. <br />
							<span>
								PLEASE READ THESE TERMS & CONDITIONS OF USE CAREFULLY AND
								THOROUGHLY BEFORE USING THIS WEBSITE AS THEY CONTAIN IMPORTANT
								INFORMATION AND AFFECT YOUR LEGAL RIGHTS. BY CLICKING TO ACCEPT
								AND/OR USING OUR SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS
								AND ALL OF THE TERMS INCORPORATED HEREIN BY REFERENCE. IF YOU DO
								NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR USE THE SERVICE.{' '}
							</span>
						</p>
						<ol>
							<li>
								<span>1.1 </span>
								Mints Club provides a marketplace for Users looking to sell
								Digital Assets (Sellers) and parties looking to purchase Digital
								Assets (Buyers). Digital Assets refers to unique non-fungible
								tokens (NFTs) linked with certain digital media and art (“NFT
								Media &apos;&apos;), implemented on the Ethereum blockchain
								using smart contracts.
							</li>
							<li>
								<span>1.2 </span>
								Mints Club is not a wallet provider, exchange broker, financial
								institution, or creditor. Mints Club provides a peer-to-peer
								service that helps Users discover and directly interact with
								each other and NFTs available on public blockchains. We do not
								have custody or control over the NFTs or blockchains you are
								intersecting with and we do not affect purchases, transfers,
								payments, or sales of NFTs. To use our Service, you must use a
								third-party wallet which allows you to engage in transactions on
								blockchains.
							</li>
							<li>
								<span>1.3 </span>
								Mints Club is not a party to any agreement between any users.
								You bear full responsibility for verifying the identity,
								legitimacy, and authenticity of NFTs that you purchase from
								third-party sellers using the Service and Mints Club make no
								claims about the identity, legitimacy, functionality, or
								authenticity of users or NFTs (and any content associated with
								such NFTs) visible on the Service.
							</li>
							<li>
								<span>1.4 </span>
								Mints Club reserves the right to change or amend these NFT Terms
								at any time and in our sole and absolute discretion. If we make
								material changes to these Terms, we will use reasonable efforts
								to provide notice of such changes, such as by providing notice
								through the Service or updating the “Last Updated Date” referred
								to at the top of this page. By continuing to use the Services,
								you confirm your acceptance of the revised Terms and all of the
								terms incorporated therein by reference effective as of the date
								these Terms are updated. It is your sole responsibility to
								review the Terms from time to time to view such changes and to
								ensure that you understand the terms and conditions that apply
								when you access or use the Service.
							</li>
							<li>
								<span>1.5 </span>
								You may not use the Mints Club NFT platform if you (i) do not
								agree to these terms (ii) are not of the age of majority in your
								jurisdiction of residence; or (iii) are prohibited from
								accessing or using the Mints Club Platform or any of its
								contents, products or services by applicable law.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>2. ACCEPTANCE</h5>
						<ol>
							<li>
								<span>2.1 </span>
								These terms constitute a legally binding agreement between Mints
								Club and each registered and unregistered user of the Mints Club
								Platform or such other URL as may be designated by Company from
								time to time, as well as any mobile apps or other related
								services or application there to the Mints Club NFT Marketplace.
							</li>
							<li>
								<span>2.2 </span>
								The Mints Club Marketplace allows Buyers and Sellers to find
								each other, and advertise, buy and sell NFTs online.
							</li>
							<li>
								<span>2.3 </span>
								Mints Club provides the Mints Club NFT Marketplace to Users to
								form contracts for the sale and purchase of NFTs.
							</li>
							<li>
								<span>2.4 </span>
								You agree that we only make the Mints Club NFT Marketplace and
								the Marketplace services available. We are not a party to any
								agreement entered between Users and we have no control over the
								conduct of Buyers, Sellers or any other User of the Mints Club
								NFT Marketplace.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>3. ACCOUNT REGISTRATION</h5>
						<ol>
							<li>
								<span>3.1 </span>
								Before Account Registration on the Mints Club NFT Marketplace
								you are required to create an Account on the Metamask wallet and
								install the relevant extension of Metamask in your respective
								browser and restart the browser before registering on the Mints
								Club NFT Marketplace. Then for creation of an account on Mints
								Club NFT Marketplace we will require you to provide certain
								registration information about yourself, and we may, in our sole
								discretion, require you to provide further information and/or
								documents at any stage during your use of the Mints Club NFT
								Marketplace. By creating an Account, you agree to provide
								accurate, current and complete registration information about
								yourself and to maintain and properly update your account
								information as necessary. We may, in our sole discretion,
								refuse, decline, suspend or disable your access to or use of the
								Mints Club NFT Marketplace or your account, and we reserve the
								right to reclaim usernames without liability to you.
							</li>
							<li>
								<span>3.2 </span>
								You are responsible for the security of your Account and your
								electronic wallet, and you agree to accept responsibility for
								all activities that occur under your Account. You must not share
								your login information or other security related information
								with anyone or allow anyone to access your Account. If you
								become aware of any unauthorized use of your password or of your
								Account, you agree to notify us immediately at ____________.com
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>4. TRANSACTIONS</h5>
						<ol>
							<li>
								<span>4.1 </span>
								You can use your electronic wallet to sell, purchase, collect
								and showcase NFTs on the Ethereum blockchain network. Such
								transactions shall be governed by, and conducted in accordance
								with, the individual Sales Terms applicable to each such
								transaction.
							</li>
							<li>
								<span>4.2 </span>
								The transactions are conducted in a Fixed Price sale format or
								the NFTs are placed on the auction. You may enter into a fixed
								price sale transaction whereby the Seller of the NFT shall list
								such NFT for sale on the Mints Club NFT Marketplace at a fixed
								price and the purchaser may enter into a legally binding
								agreement to purchase such NFT by committing to buy the NFT at
								the specified sale price, which offer the Purchaser to buy the
								NFT is accepted by the Seller (a “Fixed Price Sale”).
							</li>
							<li>
								<span>4.3 </span>
								In connection with the Sale of NFT the Seller may set the price
								of the NFT in any amount in or ETH tokens as available on the
								Mints Club NFT Marketplace.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>5. COMMUNICATION</h5>
						<ol>
							<li>
								<span>5.1 </span>
								By using the Mints Club NFT Marketplace, you agree that we may
								provide you with notices (including, but not limited to, those
								regarding changes to these Terms) or other communications,
								including marketing, relating to your use of the Mints Club NFT
								Marketplace electronically via email (in each case to the
								address that you provide), postings on the Mints Club NFT
								Marketplace, SMS message, or telephone call (in each case to the
								phone number that you provide). By providing us with your email
								address, you consent to our use of such an email address to send
								you any notices, and it is your responsibility to keep your
								email address current. For notices made by email, the date of
								receipt will be deemed the date on which such notice is
								transmitted. You will always be given the option to unsubscribe
								from receiving any marketing material from us.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>6. PAYMENTS</h5>
						<ol>
							<li>
								<span>6.1 </span>
								We make available the Mints Club NFT Marketplace but we do not
								process payment for orders on behalf of Sellers as the agent of
								the Seller.
							</li>
							<li>
								<span>6.2 </span>
								Buyers agree to pay the Purchase Price at the time of purchase
								of an NFT.
							</li>
							<li>
								<span>6.3 </span>
								Buyers must pay the Purchase Price using the Ethereum currency.
								Buyers must ensure that their linked Wallet has sufficient funds
								to pay the Purchase Price.
							</li>
							<li>
								<span>6.4 </span>
								Buyers must not pay, or attempt to pay, the Purchase Price by
								fraudulent or unlawful means. In the absence of fraud or
								mistake, all payments made are final.
							</li>
							<li>
								<span>6.5 </span>
								Each Seller agrees that when we receive full payment of the
								Purchase Price from a Buyer, this will constitute payment to the
								Seller for the NFT ad the Buyer&apos;s payment obligation to the
								Seller will be deemed completed at that time and the Seller will
								have no further claims against the Buyer with respect to that
								payment.
							</li>
							<li>
								<span>6.7 </span>
								Every transaction on the Mints Club NFT Marketplace requires the
								payment of a transaction fee (each, a “Transaction Fee”). Except
								as otherwise expressly stated in these Terms and/or the Sales
								Terms, you will be solely responsible to pay any Transaction Fee
								for any transaction entered into via the Mints Club NFT
								Marketplace.
							</li>
							<li>
								<span>6.8 </span>
								By buying and selling NFTs on the Mints Club NFT Marketplace,
								you agree to pay all applicable fees, including transaction
								fees, as stipulated on the checkout screen at the time of your
								authorize us to automatically deduct any such fees directly from
								payments to you and/or add fees to your payments where
								applicable.
							</li>
							<li>
								<span>6.9 </span>
								Approved Networks charge network fees. These fees are often
								required to cover the transaction costs on virtual currency
								networks and may apply to the purchase transactions. Unless
								indicated otherwise in your account or elsewhere in the Terms of
								the Mints Club NFT Marketplace, you are solely responsible for
								paying all network fees. We will not advance nor fund network
								fees on your behalf, nor be responsible should the network fee
								paid be insufficient or excessive. Your Account and Wallet from
								which you wish to send must hold sufficient NFTs and funds to
								cover the transaction and its associated network fees, failing
								which the transaction may be blocked, might fail or result in
								your value being suspended temporarily or forever.
							</li>
							<li>
								<span>6.10 </span>
								Any User demanding settlement through one of the third party
								payment processors agrees thereby for the payment to be made
								through websites covering the payment systems and states that
								he/she has read and accepted the terms and conditions available
								on such websites. To the extent permitted by law, we shall not
								be liable against the Users for any problems related to payments
								for which the owners of such sites are responsible, in
								particular for any delays in processing payments or inability to
								process them for technical reasons. In such cases the User shall
								contact the applicable payment processor&apos;s site in
								accordance with that websites terms and conditions.
							</li>
							<li>
								<span>6.11 </span>
								You agree that you are solely responsible for (i) determining
								what, if any, taxes apply to your NFT transactions on the NFT
								Platform and (ii) paying any and all sales, use, value-added and
								other taxes, duties, and assessments (except taxes on our net
								income) now or hereafter claimed or imposed by any governmental
								authority (collectively, “Taxes&apos;&apos;) associated with
								your use of, and transactions conducted on, the NFT Platform.
								Neither us nor our Affiliates or employees are responsible for
								determining the taxes that may apply to your NFT transactions.
								Except for corporate income taxes levied on us, you: (a) will
								pay or reimburse us for all national, federal, state, local or
								other taxes and assessments of any jurisdiction, including value
								added taxes and taxes as required by international tax treaties,
								customs or other import or export taxes, and amounts levied in
								lieu thereof based on charges set, services performed or
								payments made hereunder, as are now or hereafter may be imposed
								under the authority of any national, state, local or any other
								taxing jurisdiction; and (b) will not be entitled to deduct the
								amount of any such Taxes from payments (including servicing
								fees) made to us pursuant to these Terms [or the Sales Terms].
							</li>
							<li>
								<span>6.12 </span>
								If we determine a Buyer should be refunded the Purchase Price.
								We have the right to refuse to pay the Net Sales Proceeds to the
								Seller. The Seller acknowledges that we may set off any amounts
								the Seller owes to us from time to time against any amounts we
								owe to the Seller.
							</li>
							<li>
								<span>6.13 </span>
								Users agree that we may refuse to process any payment if we
								believe that a transaction is fraudulent, invalid, suspicious,
								or breaches applicable law or these Terms.
							</li>
							<li>
								<span>6.14 </span>
								This clause will survive the termination or expiry of these
								Terms.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>7. REFUNDS</h5>
						<ol>
							<li>
								<span>7.1 </span>
								Buyers are not entitled to return NFTs or receive a refund for
								change of mind or other circumstances.
							</li>
							<li>
								<span>7.2 </span>
								Certain legislation and consumer protection laws and
								regulations, may confer Users with rights, warranties,
								guarantees and remedies relating to the provision of the Mints
								Club NFT Marketplace by us to Users which cannot be excluded,
								restricted or modified.
							</li>
							<li>
								<span>7.3 </span>
								Nothing in these Terms excludes User&apos;s Statutory Rights as
								a consumer under the Regulations. Users agree that our Liability
								for the Mints Club NFT Marketplace provided to an entity defined
								as a consumer under the Regulations is governed solely by the
								Regulations and these Terms.
							</li>
							<li>
								<span>7.4 </span>
								Subject to your Statutory Rights, we exclude all express and
								implied warranties, and all material, work and services
								(including the Mints Club NFT Marketplace) are provided to Users
								without warranties of any kind, either express or implied,
								whether in statute, at law or on any other basis.
							</li>
							<li>
								<span>7.5 </span>
								This clause will survive the termination or expiry of these
								Terms.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>8. COPYRIGHT POLICY</h5>
						<p className="text-justify">
							We may, but are not obligated to, monitor the NFTs, NFT Media and
							Your Content uploaded to the Mints Club NFT Marketplace for any
							infringement of a third party’s intellectual property rights.
							However, Mints Club cannot undertake to review all such content
							before it is posted on the Service, and cannot ensure prompt
							removal of objectionable content after it has been posted.
							Accordingly, Mints Club assumes no liability for any action
							regarding transmissions, communications, or content provided by
							any user or third party. If you believe that any text, graphics,
							photos, audio, videos or other materials or works uploaded,
							downloaded or appearing on the Services have been copied in a way
							that constitutes copyright infringement, you may submit a
							notification to our legal department, by providing the following
							information in writing: identification of the copyrighted work
							that is claimed to be infringed; identification of the allegedly
							infringing material that is requested to be removed, including a
							description of where it is located on the Mints Club Mints Club
							NFT Marketplace; information for our copyright agent to contact
							you, such as an address, telephone number and e-mail address; a
							statement that you have a good faith belief that the identified,
							allegedly infringing use is not authorized by the copyright
							owners, its agent or the law; a statement that the information
							above is accurate, and under penalty of perjury, that you are the
							copyright owner or the authorized person to act on behalf of the
							copyright owner; and the physical or electronic signature of a
							person authorized to act on behalf of the owner of the copyright
							or of an exclusive right that is allegedly infringed. Notices of
							copyright infringement claims should be sent by mail to:
							________________. It is our policy, in appropriate circumstances
							and at our discretion, to disable or terminate the accounts of
							Users who repeatedly infringe copyrights or intellectual property
							rights of others. Any User of the Mints Club Mints Club NFT
							Marketplace who has uploaded or posted materials identified as
							infringing as described above may supply a counter-notification.
							When we receive a counter-notification, we may reinstate the posts
							or material in question, in our sole discretion. To file a
							counter-notification with us, you must provide a written
							communication (by fax or regular mail or by email) that sets
							forth: your name, address, telephone number, e-mail address and
							physical or electronic signature; identification of the material
							that has been removed or to which access has been disabled and the
							location at which the material appeared before it was removed or
							access to it was disabled; and a statement under penalty of
							perjury that you have a good faith belief that the material was
							removed or disabled as a result of mistake or misidentification of
							the material to be removed or disabled. Please note that you will
							be liable for damages if you materially misrepresent that content
							or an activity is not infringing the copyrights of others.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>9. WARRANTIES</h5>
						<ol>
							<li className="li-inner-ol">
								<span>9.1 </span>
								Users represent, warrant and agree that:
								<ol>
									<li>
										<span>a. </span>
										They will not use our Mints Club NFT Marketplace, including
										the Content, in any way that competes with our business.
									</li>
									<li>
										<span>b. </span>
										There are no legal restrictions preventing Users from
										entering into these Terms.
									</li>
									<li>
										<span>c. </span>
										All information and documentation that Users provide to us
										in connection with these Terms is true, correct and
										complete.
									</li>
									<li className="li-inner-ol">
										<span>d. </span>
										We provide the Mints Club NFT Marketplace and any software
										operating it (including any associated supplier software and
										Application Programming Interfaces accessed to operate the
										Mints Club NFT Marketplace) on an ‘as is’ basis and that we
										make no representations or warranties regarding the software
										including that:
										<ol>
											<li>
												<span>d.1 </span>
												The software, including any back-end infrastructure or
												smart contracts is of merchantability, satisfactory
												quality, fitness for a particular purpose,
												non-infringement or quiet enjoyment.
											</li>
											<li>
												<span>d.2 </span>
												That the software, including any back-end infrastructure
												or smart contracts will be uninterrupted, secure,
												private, error free or free of harmful components or
												that any error will be fixed in the API.
											</li>
											<li>
												<span>d.3 </span>
												That any data transmitted to the Software by a User will
												be secure or not otherwise lost or altered.
											</li>
											<li>
												<span>d.4 </span>
												We, our Affiliates or Personnel, the API Provider or its
												Personnel is not liable for any harm of damage suffered
												as a result of using the software including in respect
												of trading NFTs via the API, any loss of an NFT Asset,
												digital assets or tokens, and including in respect of
												any loss of profit, loss of revenue, loss of
												opportunities or loss of use, Ethereum due to security
												breach or cyber-attack, or electronic or technological
												failure, registration errors or for any other reason.
											</li>
										</ol>
									</li>
									<li>
										<span>e. </span>
										They understand that the price of NFTs are volatile and
										subjective, and there are risks associated with purchasing
										NFTs including but not limited to, the risk of purchasing
										counterfeit assets, mislabeled assets, assets that are
										vulnerable to metadata decay, assets on smart contracts with
										bugs, and assets that may become untransferable, and by
										trading on our Mints Club NFT Marketplace. Users acknowledge
										and accept such risks.
									</li>
									<li>
										<span>f. </span>
										They have not relied on any representations or warranties
										made by us in relation to the Mints Club NFT
										Marketplace(including as to Ethereum the Mints Club NFT
										Marketplace is or will be fit or suitable for your
										particular purposes), unless expressly stipulated in these
										Terms.
									</li>
									<li>
										<span>g. </span>
										they will be responsible for the use of any part of the
										Mints Club NFT Marketplace, and Users must ensure that no
										person uses any part of the Mints Club NFT Marketplace: (1)
										to break any law (including participating in money
										laundering, terrorist financing or wash trading) or infringe
										any person&apos;s rights (including Intellectual Property
										Rights); (2) to transmit, publish or communicate material
										that is defamatory, offensive, abusive, indecent, menacing
										or unwanted; (3) to develop, utilize, or disseminate any
										software or interact with the Mints Club NFT Marketplace in
										any manner, that could harm, or impair it; (4) use any
										robot, spider, crawler, scraper, script, browser extension,
										offline reader or other automated means or interface not
										authorized by us to access the Mints Club NFT Marketplace,
										extract data or otherwise interfere with or modify the
										rendering of Mints Club NFT Marketplace or functionality or
										(5) in any way that damages, interferes with or interrupts
										the supply of the Mints Club NFT Marketplace.
									</li>
								</ol>
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>10. SELLER WARRANTIES</h5>
						<ol>
							<li className="li-inner-ol">
								<span>10.1 </span>Sellers represent, warrant and agree that:
								<ol>
									<li>
										<span>a. </span>
										They are responsible for complying with all laws, rules and
										regulations which apply to selling the listed NFTs.
									</li>
									<li>
										<span>b. </span> They have all rights to each NFT that are
										listed.
									</li>
									<li>
										<span>c. </span>
										They will not sell stolen NFTs, NFTs taken without
										authorisation or otherwise illegally obtained NFTs on the
										Mints Club NFT Marketplace.
									</li>
								</ol>
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>11. EXCLUSIONS TO LIABILITY</h5>
						<ol>
							<li className="li-inner-ol">
								<span>11.1 </span>
								Despite anything to the contrary, to the maximum extent
								permitted by law, we, our Personnel, our contractors and
								suppliers, will not be liable for, and Users waive and release
								us, our Personnel, the API Provider, API Provider’s suppliers
								and contractors and API Provider’s Personnel, from and against,
								any Liability caused or contributed to by, arising from or
								connected with:
								<ol>
									<li>
										<span>a. </span>Users or Users Personnel&apos;s acts or
										omissions.
									</li>
									<li>
										<span>b. </span>
										Loss of, or damage to, any property or any injury or loss to
										any person, loss of profits or loss of expectation, loss of
										goodwill, loss of business, loss of data or any other
										indirect or consequential loss or damage howsoever arising.
									</li>
									<li>
										<span>c. </span>
										Any use or application of the Marketplace Services by a
										person or entity other than the User, or other than as
										reasonably contemplated by these Terms.
									</li>
									<li>
										<span>d. </span>
										Any use of the Marketplace Services, including in respect of
										trading NFTs via the Protocol, including for any loss of an
										NFT Asset, digital assets or tokens, and including in
										respect of any loss of profit, loss of revenue, loss of
										opportunities or loss of use, whether due to security breach
										or cyber-attack, or electronic or technological failure,
										registration errors or for any other reason.
									</li>
									<li>
										<span>e. </span>
										Any aspect of the Buyer and Seller interaction including the
										NFTs offered by the Seller.
									</li>
									<li>
										<span>f. </span>
										Any NFTs containing viruses or other harmful components.
									</li>
									<li>
										<span>g. </span>
										Any works, services, goods, materials or items which do not
										form part of the Marketplace Services (as expressed in these
										Terms), or which have not been provided by us, including
										descriptions of any NFTs pulled from third party sources.
									</li>
									<li>
										<span>h. </span>
										Any tax liability you incur as a resulting of buying or
										selling NFTs on the Mints Club NFT Marketplace.
									</li>
									<li>
										<span>i. </span>Their Computing Environment.
									</li>
									<li>
										<span>j. </span>
										Any third parties or any goods and services provided by
										third parties, end users or suppliers, providers or other
										subcontractors which the provision of the Mints Club NFT
										Marketplace may be contingent on, or impacted by.
									</li>
									<li>
										<span>k. </span>
										The Marketplace Services being unavailable, or any delay in
										us providing the Marketplace Services to Users, for whatever
										reason.
									</li>
									<li>
										<span>l. </span>
										Any event outside of our reasonable control (including a
										Force Majeure Event).
									</li>
								</ol>
							</li>
							<li>
								<span>11.2 </span>
								This clause will survive the termination or expiry of these
								Terms.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>12. LIMITATIONS ON LIABILITY</h5>
						<ol>
							<li className="li-inner-ol">
								<span>12.1 </span>
								Despite anything to the contrary, to the maximum extent
								permitted by law:
								<ol>
									<li>
										<span>a. </span>We will not be liable for Consequential
										Loss.
									</li>
									<li>
										<span>b. </span>Each Party&apos;s liability for any
										Liability under these Terms will be reduced proportionately
										to the extent the relevant Liability was caused or
										contributed to by the acts or omissions of the other Party
										(or any of that Party&apos;s Personnel), including a failure
										to mitigate.
									</li>
									<li>
										<span>c. </span>Our aggregate liability for any Liability
										arising from or in connection with these Terms will be
										limited to us resupplying the Marketplace Services to Users
										or, in our sole discretion, to us repaying Buyers or Sellers
										the amount of the Service Fees paid by Buyers of Sellers to
										us in respect of the supply of the Marketplace Services to
										which the Liability relates, or where there are no Service
										Fees paid, $1000.
									</li>
								</ol>
							</li>
							<li>
								<span>12.2 </span>
								This clause will survive the termination or expiry of these
								Terms.
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>13. TERMS OF USE AND PROHIBITED ACTIVITIES</h5>
						<ol>
							<li>
								<span>13.1 </span>
								YOU AGREE THAT YOU ARE RESPONSIBLE FOR YOUR OWN CONDUCT WHILE
								ACCESSING OR USING THE Mints Club NFT Marketplace OR YOUR
								ACCOUNT, AND FOR ANY CONSEQUENCES THEREOF. YOU AGREE TO USE THE
								Mints Club NFT Marketplace OR YOUR ACCOUNT AT YOUR OWN RISK AND
								ONLY FOR PURPOSES THAT ARE LEGAL PROPER AND IN ACCORDANCE WITH
								THESE TERMS AND ANY APPLICABLE LAWS OR REGULATIONS.
							</li>
							<li className="li-inner-ol">
								<span>13.2 </span>
								We hereby grant you a limited, non-exclusive, non-transferable,
								revocable license to access and use the Mints Club NFT
								Marketplace and the Services offered thereunder in accordance
								with these Terms. Our grant of such license is subject to the
								following conditions. When using the Mints Club NFT Marketplace
								and the Services offered thereunder, you acknowledge, agree,
								warrant and undertake not to (and shall not, knowingly or
								otherwise, authorize, allow or assist any other party to):
								<ol>
									<li>
										<span>a. </span>
										Use the Mints Club NFT Marketplace or your Account to
										perform any unlawful activities that violate such applicable
										laws or regulations (including but not limited to money
										laundering, terrorism financing and/or fraudulent
										activities) or otherwise engage in any immoral activities.
									</li>
									<li>
										<span>b. </span>
										Use the Mints Club NFT Marketplace or your Account if you
										are not 18 years old (or the minimum age required in your
										jurisdiction of residence to use the Mints Club NFT
										Marketplace), or are temporarily or indefinitely suspended
										from using the Mints Club NFT Marketplace, or are a person
										with whom transactions are prohibited under economic or
										trade sanctions or embargoes.
									</li>
									<li>
										<span>c. </span>
										Use the Mints Club NFT Marketplace or your Account for any
										commercial use (for example, any business (whether paid or
										unpaid), advertising, or marketing purposes)
									</li>
									<li>
										<span>d. </span>
										Use the Mints Club NFT Marketplace or your Account to engage
										in any activity which operates to defraud Us or to provide
										any false, inaccurate, or misleading information.
									</li>
									<li>
										<span>e. </span>
										Use the Mints Club NFT Marketplace or your Account without
										fully complying with all of our requests for additional
										information or documentation from you, which additional
										information or documentation shall be complete, truthful,
										accurate and reliable.
									</li>
									<li>
										<span>f. </span>
										Use the Mints Club NFT Marketplace or your Account to
										conduct electronic spamming or otherwise distribute any
										unsolicited or unauthorized advertising, promotional or
										marketing material, junk or chain messages.
									</li>
									<li>
										<span>g. </span>
										Use the Mints Club NFT Marketplace or your Account to upload
										content on the Mints Club NFT Marketplace that contains or
										is infected with viruses, malicious codes, Trojan horses, is
										immoral or illegal or contains any other harmful or
										deleterious programmes or items of a destructive or
										deceptive nature.
									</li>
									<li>
										<span>h. </span>
										Transfer your Account and the related login credentials to
										any other party without our prior written consent.
									</li>
									<li>
										<span>i. </span>
										Modify or adapt, in whole or any part of, the Mints Club NFT
										Marketplace into any other programme or application.
									</li>
									<li>
										<span>j. </span>
										Disassemble, decompile, reverse-engineer or otherwise
										attempt to derive the source code, object code, underlying
										concepts, ideas and algorithms of the Mints Club NFT
										Marketplace or any components thereof.
									</li>
									<li>
										<span>k. </span>
										Use any robot, spider, crawler, scraper, script, deep link
										or other similar automated data gathering or extraction
										tool, program, algorithm or methodology to access, copy,
										modify or monitor the Mints Club NFT Marketplace.
									</li>
									<li>
										<span>l. </span>
										Use the Mints Club NFT Marketplace or your Account in any
										manner that would cause you to infringe any content,
										copyright, trademark, patent, publicity, moral right,
										database or other intellectual property rights
										(collectively, the “Intellectual Property Rights”) that
										belong to or are licensed to us, our affiliates, or any
										third-party, and you undertake not to take or attempt to
										take any action, or claim ownership of any property, that
										infringes or would infringe upon our intellectual property
										interests.
									</li>
									<li>
										<span>m. </span>
										Use the Mints Club NFT Marketplace or your Account in a way
										that could damage, disable, impair or compromise the Mints
										Club NFT Marketplace or interfere with other users or affect
										the reputation of Us.
									</li>
									<li>
										<span>n. </span>
										Take any action that imposes an unreasonable or
										disproportionately large burden or load on Our, or Immutable
										X infrastructure (including, but without limitation to, our
										servers, networks, data centers and related or like
										equipment), nor will you detrimentally interfere with,
										intercept or expropriate any system, data or information
										belonging to other users of the Mints Club NFT Marketplace.
									</li>
									<li>
										<span>o. </span>
										Engage in any other activities deemed inappropriate by us or
										which are in contravention of these Terms, nor will you do
										anything on the Mints Club NFT Marketplace that may be
										deemed objectionable to, or could harm the reputation or
										Intellectual Property Rights of, us or our licensors.
									</li>
									<li>
										<span>p. </span>
										Provide false, inaccurate, incomplete or misleading
										information to us or any of our affiliates or third-party
										services providers.
									</li>
									<li>
										<span>q. </span>
										Create Accounts by automated means or under false or
										fraudulent pretenses.
									</li>
									<li>
										<span>r. </span>
										Impersonate another person (via the use of an email address
										or otherwise).
									</li>
									<li>
										<span>s. </span>
										Use, employ, operate or create a computer program to
										simulate the human behavior of a user (“Bots”), and or use,
										employ or operate such Bots or other similar forms of
										automation to engage in any activity or transaction on the
										Mints Club NFT Marketplace.
									</li>
									<li>
										<span>t. </span>
										Acquire NFTs through inappropriate or illegal means
										(including, but not limited to, through the use of a stolen
										credit card, or a payment mechanism that you do not have the
										right to use, or purchasing a NFT and then attempting to
										charge the cost back to your payment method while still
										maintaining ownership or control of the NFT or selling,
										swapping or giving away the NFT to someone else.
									</li>
									<li>
										<span>u. </span>
										Purchase, sell or facilitate the purchase and sale of any
										user’s account(s) to other users or third parties for cash
										outside of the Mints Club NFT Marketplace.
									</li>
									<li>
										<span>v. </span>Acquire NFTs through inappropriate or
										illegal means.
									</li>
									<li>
										<span>w. </span>
										Breach our privacy or confidentiality or the privacy or
										confidentiality of any user of the Mints Club NFT
										Marketplace.
									</li>
									<li>
										<span>x. </span>
										Create nor register a security interest or encumbrance in or
										over any NFT.
									</li>
									<li>
										<span>y. </span>
										Use the Mints Club NFT Marketplace or your Account to engage
										in any lottery, bidding fee auctions, contests, sweepstakes,
										or other games of chance.
									</li>
									<li>
										<span>z. </span>
										Assist another person, entity, contractual arrangement,
										algorithm or device to do anything prohibited in above
										paragraphs.
									</li>
								</ol>
							</li>
						</ol>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>14. EFFECT OF YOUR BREECH</h5>
						<p>
							If you engage in any of the Prohibited Activities, we may, at our
							sole and absolute discretion, without notice or liability to you,
							and without limited any of our other rights or remedies at law or
							in equity, immediately suspend or terminate your user account
							and/or delete your NFTs’ images and descriptions from the Mints
							Club NFT Marketplace. If we delete your NFTs’ images and
							descriptions from the Mints Club NFT Marketplace, such deletion
							will not affect your ownership rights in any NFTs that you already
							Own, but you will not receive a refund of any amounts you paid for
							such NFTs.
							<br />
							<span>
								NOTWITHSTANDING THE FOREGOING, HOWEVER, IF WE REASONABLY BELIEVE
								THAT YOU ARE ENGAGED IN ANY OF THE PROHIBITED ACTIVITIES SET
								FORTH IN PARAGRAPHS (q) TO (u) OF SECTION 12.2, IN ADDITION TO
								OUR RIGHT TO IMMEDIATELY SUSPEND OR TERMINATE YOUR USER ACCOUNT
								AND/OR DELETE YOUR NFTs IMAGES AND DESCRIPTIONS FROM THE Mints
								Club NFT Marketplace, WE ALSO RESERVE THE RIGHT, AT OUR SOLE AND
								ABSOLUTE DISCRETION AND WITHOUT NOTICE OR LIABILITY TO YOU, TO
								TAKE ANY OR ALL OF THE FOLLOWING ACTIONS: (A) TO DEEM ANY
								TRANSACTION THAT TOOK PLACE VIA OR AS THE RESULT OF SUCH
								ACTIVITIES TO BE VOID AB INITIO; AND/OR (B) TO IMMEDIATELY
								CONFISCATE ANY NFTs THAT WERE PURCHASED OR ACQUIRED AS THE
								RESULT OF SUCH ACTIVITIES WITHOUT ANY LIABILITY TO YOU TO
								REIMBURSE OR REFUND YOU FOR SUCH CONFISCATED NFTs.
							</span>
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>15. TERMINATION</h5>
						<p>
							<span>15.1</span> If at any time Users do not agree to these
							Terms, they should immediately cease using our Mints Club NFT
							Marketplace. Before Sellers cease using the Mints Club NFT
							Marketplace, they should remove any live Listings from the Mints
							Club NFT Marketplace then withdraw any NFTs in their inventory. If
							Sellers do not remove their Listings, then Buyers may still
							purchase NFTs from you.
							<br />
							<span>15.2</span> We may suspend User access to the Mints Club NFT
							Marketplace or terminate these Terms immediately on written notice
							to a User, including by suspending a User’s ability to trade NFTs
							on the Mints Club NFT Marketplace, if:
						</p>
						<ol>
							<li>
								At any time, we discontinue our Mints Club NFT Marketplace, in
								whole or in part.
							</li>
							<li>
								Users (or any of their Personnel) breach any provision of these
								Terms or we reasonably suspect that Users (or any of their
								Personnel) have breached any provision of these Terms.
							</li>
							<li>
								there is any reason outside our control which has the effect of
								compromising our ability to provide the Marketplace Services,
								including a Force Majeure Event.
							</li>
							<li>Users are unable to pay their debts as they fall due.</li>
						</ol>
						<p>
							<span>15.3</span> The agreement between us and Users set out in
							these Terms will terminate immediately upon written notice by a
							User, if we:
						</p>
						<ol>
							<li>
								Are in breach of a material term of these Terms, and that breach
								has not been remedied within 10 business days of being notified
								by a User.
							</li>
							<li>Are unable to pay our debts as they fall due.</li>
						</ol>
						<p>
							<span>15.4</span> Upon expiry or termination of these Terms:
						</p>
						<ol>
							<li>
								We will cease providing the Marketplace Services and the Mints
								Club NFT Marketplace to Users
							</li>
							<li>Any live Listings of yours will automatically be removed.</li>
						</ol>
						<p>
							<span>15.5</span> Termination of these Terms will not affect any
							rights or liabilities that a Party has accrued under it.
						</p>
						<p>
							<span>15.6</span> This clause will survive the termination or
							expiry of these Terms.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>16. PRIVACY POLICY</h5>
						<p>
							Please refer to our Privacy Policy for information about how we
							collect, use, and share personal data about you. By submitting
							personal data through our Service, you agree to the terms of our
							Privacy Policy and you expressly consent to the collection, use,
							and disclosure of your personal data in accordance with the
							Privacy Policy.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>17. DISCLAIMERS</h5>
						<p>
							EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN WRITING BY US, YOU
							EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND USE OF THE
							Mints Club NFT Marketplace IS AT YOUR SOLE RISK AND THAT THE Mints
							Club NFT Marketplace AND THE NFTs LISTED ON THE Mints Club NFT
							Marketplace ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS
							WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR
							IMPLIED. YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING
							INFORMATION AND DEALING ONLINE OVER THE INTERNET, AND YOU AGREE
							THAT WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY BREACH OF
							SECURITY UNLESS IT IS DUE TO OUR GROSS NEGLIGENCE. WE WILL NOT BE
							RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS OF ANY KIND THAT YOU
							INCUR AS A RESULT OF YOUR USE OF THE MINTS CLUB Mints Club NFT
							Marketplace, THE Ethereum BLOCKCHAIN NETWORK, THE IMMUTABLE X
							PROTOCOL, OR YOUR ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO
							ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (I) USER ERROR, SUCH
							AS FORGOTTEN PASSWORDS OR INCORRECTLY CONSTRUED SMART CONTRACTS OR
							OTHER TRANSACTIONS; (II) SERVER FAILURE OR DATA LOSS; (III)
							CORRUPTED WALLET FILES; OR (IV) UNAUTHORIZED ACCESS OR ACTIVITIES
							BY THIRD PARTIES, INCLUDING, BUT NOT LIMITED TO, THE USE OF
							VIRUSES, PHISHING, BRUTE-FORCING OR OTHER MEANS OF ATTACK AGAINST
							THE Mints Club NFT Marketplace, THE Ethereum BLOCKCHAIN NETWORK,
							THE IMMUTABLE X PROTOCOL ,OR ANY ELECTRONIC WALLET. WE WILL NOT BE
							RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS OF ANY KIND FROM ANY
							ACTION THAT RESULTS FROM YOU PROVIDING AN INCORRECT WALLET
							ADDRESS. TO THE FULLEST EXTENT PROVIDED BY LAW, WE HEREBY DISCLAIM
							ALL WARRANTIES OF ANY KIND, Ethereum EXPRESS OR IMPLIED,
							STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
							WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
							TITLE, CORRECTNESS, ACCURACY, RELIABILITY AND NON-INFRINGEMENT AS
							TO THE Mints Club NFT Marketplace. WITHOUT LIMITING THE GENERALITY
							OF THE FOREGOING, WE, OUR PARENT, SUBSIDIARIES, AFFILIATES, AND
							LICENSORS DO NOT REPRESENT OR WARRANT TO YOU THAT: (I) YOUR ACCESS
							TO OR USE OF THE Mints Club NFT Marketplace WILL MEET YOUR
							REQUIREMENTS; (II) YOUR ACCESS TO OR USE OF THE Mints Club NFT
							Marketplace WILL BE UNINTERRUPTED, TIMELY, SECURE, OR FREE FROM
							ERROR; (III) USAGE DATA PROVIDED THROUGH THE Mints Club NFT
							Marketplace WILL BE ACCURATE; (IV) THE Mints Club NFT Marketplace
							OR ANY CONTENT, SERVICES, OR FEATURES MADE AVAILABLE ON OR THROUGH
							THE Mints Club NFT Marketplace ARE FREE OF VIRUSES OR OTHER
							HARMFUL COMPONENTS; OR (V) THAT ANY DATA THAT YOU DISCLOSE WHEN
							YOU USE THE APP WILL BE SECURE. THE FOREGOING DOES NOT AFFECT ANY
							WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE
							LAW. NFTs ARE INTANGIBLE DIGITAL ASSETS THAT EXIST ONLY BY VIRTUE
							OF THE OWNERSHIP RECORD MAINTAINED IN THE BLOCKCHAIN NETWORK. ALL
							SMART CONTRACTS, INCLUDING ANY TRANSFER OF TITLE THAT MIGHT OCCUR
							IN ANY UNIQUE NFT, ARE CONDUCTED AND OCCUR ON THE DECENTRALIZED
							LEDGER WITHIN THE BLOCKCHAIN NETWORK. WE HAVE NO CONTROL OVER AND
							MAKE NO GUARANTEES OR PROMISES WITH RESPECT TO SMART CONTRACTS. WE
							ARE NOT RESPONSIBLE FOR LOSSES DUE TO BLOCKCHAINS OR ANY OTHER
							FEATURES OF THE BLOCKCHAIN NETWORK, OR ANY ELECTRONIC WALLET,
							INCLUDING BUT NOT LIMITED TO LATE REPORTING BY DEVELOPERS OR
							REPRESENTATIVES (OR NO REPORTING AT ALL) OF ANY ISSUES WITH THE
							BLOCKCHAIN SUPPORTING THE Ethereum BLOCKCHAIN NETWORK OR THE
							IMMUTABLE X PROTOCOL, INCLUDING FORKS, TECHNICAL NODE ISSUES, OR
							ANY OTHER ISSUES RESULTING IN FUND LOSSES.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>18. FORCE MAJEURE </h5>
						<p>
							We will not be liable for any delay or failure to perform our
							obligations under these Terms if such delay is due to any
							circumstance beyond our reasonable control (including but not
							limited to epidemics, pandemics, and Government sanctioned
							restrictions and orders, whEthereum known or unknown at the time
							of entering into these Terms) (“Force Majeure Event”). In
							particular, we shall not incur any liability or penalty for not
							performing any act or fulfilling any duty or obligation hereunder
							or in connection with the matters contemplated hereby by reason of
							any occurrence that is not within our control (including any
							provision of any present or future law or regulation or any act of
							any governmental authority, any act of God or war or terrorism,
							any epidemic or pandemic, or the unavailability, disruption or
							malfunction of the Internet, the World Wide Web or any other
							electronic network, the Ethereumeum network or blockchain or
							Immutable X Protocol or any aspect thereof, or any consensus
							attack, or hack, or denial-of-service or other attack on the
							foregoing or any aspect thereof, or on the other software,
							networks and infrastructure that enables us to provide the Mints
							Club NFT Marketplace). It is understood that we shall use
							commercially reasonable efforts, consistent with accepted
							practices in the industries in which we operate, as applicable, to
							resume performance as soon as reasonably practicable under the
							circumstances.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>19. LINKS TO THIRD-PARTY RESOURCES</h5>
						<p>
							Any hyperlink to any third party source or resource on the Website
							is provided for your convenience and ease of reference only. Mints
							Club does not necessarily recommend, endorse or approve, and is
							not responsible or liable for, any third-party content that may be
							accessed through any hyperlink on the Website.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>20. RELATIONSHIP</h5>
						<p>
							Nothing in the Terms shall be construed to create a relationship
							of agency, partnership, joint venture or other formal business
							entity or fiduciary relationship between you and the Mints Club
							(collectively as the “Parties” and individually as a “Party”).
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>21. ENTIRE UNDERSTANDING</h5>
						<p>
							These Terms constitute the complete agreement and sets out the
							entire understanding concerning the arrangement between the
							Parties on the subject matter hereof and shall, as of the
							effective date hereof, supersede all prior agreement(s) or
							understanding(s) between the Parties as well as all other
							communications, representations, promises, proposals, oral or
							written, negotiations, conversations, or discussions between or
							among the Parties relating to the subject matter of the Terms.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>22. NOTICES</h5>
						<p>
							Any notice required to be served under the Terms shall be deemed
							to have been served if either delivered through email, registered
							post or courier service at the respective addresses of the Parties
							provided and in such a case it shall be deemed (whether it is
							actually or not) to have been received at the time when such
							e-mail, registered post or courier would, in the normal and
							ordinary course, be delivered to the Party to be served.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>23. GOVERNING LAW AND JURISDICTION</h5>
						<p>
							<span>Governing Law:</span> These Terms and your use of the
							Website shall be governed, interpreted, and construed solely in
							accordance with the applicable laws for the time being in force in
							the Punjab Province of Pakistan.
							<br />
							<span>Jurisdiction:</span> In the event of any dispute(s) between
							the Parties arising from, or in connection with, or under these
							Terms or your use of the Website, the court(s) of competent
							jurisdiction, civil and/or criminal (as the case may be), at
							Lahore, Pakistan shall have exclusive jurisdiction to adjudicate
							upon such dispute(s).
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>24. MODIFICATION</h5>
						<p>
							We may at our sole discretion, at any time and without prior
							notice change, alter, revise, modify, update, amend, remove, or
							discontinue any feature or functionality of the Mints Club NFT
							Marketplace, change the nature of its services; make amendments to
							the Website without any liability upon itself, provided that this
							provision may not prevent the Company from notifying you of any
							such changes for your convenience. Your continued use of the
							Website shall indicate your acceptance of such changes.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>25. NO WAIVER</h5>
						<p>
							Any failure or delay by the Mints Club to exercise, enforce or
							demand its rights or remedies under these Terms at any time for
							any period shall not operate or be construed as a waiver or
							relinquishment of the Mints Club right to enforce strict
							performance thereof. No single or partial exercise or enforcement
							by the Mints Club of any right or remedy under the Terms or the
							law shall preclude any other or future exercise or enforcement of
							any right or remedy by such party under these Terms or the law.
							Any waiver of these Terms shall only be valid if it is in writing
							by the Mints Club.
						</p>
					</div>
					<div className="terms-content mb-lg-5">
						<h5>26. HEADINGS</h5>
						<p>
							The headings in these Terms are for your use of reference only and
							shall not affect the construction or interpretation of these
							Terms.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default TermsConditions;
