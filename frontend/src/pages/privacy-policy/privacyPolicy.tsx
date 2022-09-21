import React, { useEffect } from "react";
import "./privacyPolicy.scss";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg2.png";
import { privacyBanner } from "../../utils/exportData";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Banner
        subHeading={privacyBanner.subHeading}
        heading={privacyBanner.heading}
        content={privacyBanner.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      <div className="padding-wrapper privacy">
        <div className="container">
          <div className="privacy-content mb-lg-5">
            <h5>Privacy Policy</h5>
            <p>
              MintsClub is committed to protecting your privacy. We have
              prepared this Privacy Policy to describe our working practices
              regarding the Personal Data we collect, use, and share in
              connection with the MintsClub website, as described in our Terms
              of Service (collectively, the “Service”). “NFT” as per this
              Privacy Policy refers to a non-fungible token or similar digital
              item implemented on a blockchain (such as the Ethereum
              blockchain), which uses smart contracts to link to or otherwise be
              associated with certain content or data.
              <br />
              By using our platform and the Services, you accept the terms of
              this Policy and our Terms of Use, and consent to our collection,
              use, disclosure, and retention of your information as described in
              this Policy. If you have not done so already, please also review
              our terms of use. The terms of use contain provisions that limit
              our liability to you and require you to resolve any dispute with
              us on an individual basis and not as part of any class or
              representative action. <br />
              <span>
                IF YOU DO NOT AGREE WITH ANY PART OF THIS PRIVACY POLICY OR OUR
                TERMS OF USE, THEN PLEASE DO NOT USE ANY OF THE SERVICES.
              </span>
              <br />
              Please note that this Policy does not apply to information
              collected through third-party websites or services that you may
              access through the Services or that you submit to us through
              email, text message or other electronic message or offline.
            </p>
          </div>
          <div className="privacy-content">
            <h5>Information We Collect</h5>
            <p>We may collect information about you in a range of ways.</p>
            <ul>
              <li>
                {" "}
                Identity information, such as your first name, last name,
                username or similar identifier, title, date of birth and gender.
              </li>
              <li>
                {" "}
                Contact information, such as your postal address, email address
                and telephone number.
              </li>
              <li>
                {" "}
                Profile information, such as your, profile picture, username and
                wallet address, interests, preferences, feedback and survey
                responses.
              </li>
              <li>
                {" "}
                Feedback and correspondence, such as information you provide in
                your responses to surveys, when you participate in market
                research activities, report a problem with Service, receive
                customer support or otherwise correspond with us.
              </li>
              <li>
                {" "}
                Financial information, such as your credit card or other payment
                card details.
              </li>
              <li>
                {" "}
                Transaction information, such details about purchases you make
                through the Service and billing details.
              </li>
              <li>
                {" "}
                Usage information, such as information about how you use the
                Service and interact with us.
              </li>
              <li>
                {" "}
                Marketing information, such as your preferences for receiving
                marketing communications and details about how you engage with
                them.
              </li>
              <li>
                {" "}
                Financial information, such as bank account number and bank
                routing number; financial assets holdings.
              </li>
              <li>
                {" "}
                Technical information, such as your Ethereum wallet address,
                application programming interface (API)-key and network
                information regarding transactions. Please note that your
                Ethereum wallet address is not collected by{" "}
                <a href="https://metamask.io/" target="_blank" rel="noreferrer">
                  Metamask{" "}
                </a>
                or associated plugins and mobile applications.
              </li>
            </ul>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Information Collected by other means</h5>
            <p>
              As you navigate through and interact with the MintsClub website,
              we may use automatic data collection technologies to collect
              certain information about your equipment, browsing actions, and
              patterns, including:
              <br />
              Information Collected by Our Servers. To provide our Service and
              make it more useful to you, we (or a third party service provider)
              collect information from you, including, but not limited to, your
              browser type, operating system, Internet Protocol (“IP”) address,
              mobile device ID, blockchain address, wallet type, and date/time
              stamps.
              <br />
              Log Files. We gather certain information automatically and store
              it in log files. This information includes IP addresses, browser
              type, Internet service provider (“ISP”), referring/exit pages,
              operating system, date/time stamps, and clickstream data. We use
              this information to analyze trends, administer the Service, track
              users’ movements around the Service, and better tailor our
              Services to match our users’ needs and improve their experience.
              <br />
              Cookies. Like many online services, we use cookies to collect
              information. We may use both session Cookies (which expire once
              you close your web browser) and persistent Cookies (which stay on
              your computer until you delete them) to analyze how users interact
              with our Service, make improvements to our product quality, and
              provide users with a more personalized experience.
              <br />
              Pixel Tag. In addition, we use “Pixel Tags” (also referred to as
              clear Gifs, Web beacons, or Web bugs). Pixel Tags allow us to
              analyze how users find our Service, make the Service more useful
              to you, and tailor your experience with us to meet your particular
              interests and needs.
              <br />
              Analytics Services. In addition to the tracking technologies we
              place like Cookies and Pixel Tags, other companies may set their
              own cookies or similar tools when you visit our Service. This
              includes third-party analytics services (“Analytics Services”)
              that we engage to help analyze how users use the Service. The
              information generated by the Cookies or other technologies about
              your use of our Service (the “Analytics Information”) is
              transmitted to the Analytics Services. The Analytics Services use
              Analytics Information to compile reports on user activity, which
              we may receive on an individual or aggregate basis. We use the
              information we get from Analytics Services to improve our Service.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Information Collected from Third-Parties</h5>
            <p>
              We may receive Personal and/or Anonymous Data about you from
              companies that offer their products and/or services for use in
              conjunction with our Service or whose products and/or services may
              be linked from our Service. For example, third-party wallet
              providers provide us with your blockchain address and certain
              other information you choose to share with those wallets
              providers. We may add this to the data we have already collected
              from or about you through our Service.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Information Collected from Public Blockchains</h5>
            <p>
              We may collect data from your activity that is publicly visible
              and/or accessible on blockchains. This may include blockchain
              addresses and information regarding purchases, sales, or transfers
              of NFTs, which may then be associated with other data you have
              provided to us.e have already collected from or about you through
              our Service.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Use of Your Personal Data</h5>
            <p>
              When we collect your Personal Data from you, we will inform you at
              the time as to the reason we are requesting such Personal Data.
              The Company uses your Personal Data in any or all of the following
              ways:
            </p>
            <ul>
              <li> To facilitate you in the creation of your account.</li>
              <li> Recognise you as a legitimate user of our platform.</li>
              <li>
                {" "}
                Provide you with our Service, which includes helping you view,
                explore, and create NFTs using our platform and, at your own
                risk, connect with other users to purchase, sell NFTs on public
                blockchains.
              </li>
              <li>
                {" "}
                Administration of our Service and quality of experience when you
                interact with our platform.
              </li>
              <li> Provide customer support and respond to your queries.</li>
              <li>
                {" "}
                Show your username next to the NFTs currently or previously
                accessible in your third-party wallet, and next to NFTs on which
                you have interacted.
              </li>
              <li>
                {" "}
                Send you notifications related to activity on the platform,
                including notifications of offers on your NFTs.
              </li>
              <li>
                {" "}
                Send you newsletters, promotional materials, and other notices
                related to our Services.
              </li>
              <li>
                {" "}
                To comply with applicable laws and cooperate with investigations
                by law enforcement agencies.
              </li>
            </ul>
          </div>
          <div className="privacy-content">
            <h5>Disclosure of your Personal Data</h5>
            <h6>
              Third Party Service Providers:{" "}
              <span>
                We may share your Personal Data with third party service
                providers.
              </span>
            </h6>
            <h6>
              Analytics:{" "}
              <span>
                We may share your data to be used by analytic platforms or other
                such equivalent tools which make use of statistical information.
              </span>
            </h6>
            <h6>
              Legal Rights:{" "}
              <span>
                We may also share information as required by law, regulation,
                legal process, or governmental request.
              </span>
            </h6>
            <h6>
              Other Disclosures:{" "}
              <span>
                We may also disclose your Personal Data: to fulfill the purpose
                for which you provide it; for any other purpose disclosed by us
                when you provide it; or with your consent.
              </span>
            </h6>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Third-Party Websites</h5>
            <p>
              Our platform may contain links to third-party websites. When you
              click on a link to any other website or location, you will leave
              our website and go to another site, and another entity may collect
              Personal Data from you. We have no control over, do not review,
              and cannot be responsible for these third-party websites or their
              content. Please be aware that the terms of this Privacy Policy do
              not apply to these third-party websites or their content, or to
              any collection of your Personal Data after you click on links to
              such third-party websites.
              <br />
              You may access other third-party services through the Site, for
              example by clicking on links to those third-party services from
              within the Site. We are not responsible for the privacy policies
              and/or practices of these third-party services, and we encourage
              you to carefully review their privacy policies.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Third-Party Wallets</h5>
            <p>
              To use the MintsClub NFT platform, you must use a third-party
              wallet which allows you to engage in transactions on public
              blockchains. Your interactions with any third-party wallet
              provider are governed by the applicable terms of service and
              privacy policy of the respective third party.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Security of Data</h5>
            <p>
              We care about the security of your data and use adequate physical,
              administrative, and technological measures to maintain the
              security of the data collected through our platform. Nonetheless,
              no physical and logical security framework is perfect, and hence
              no guarantee can be provided. In the unfortunate event where any
              data is compromised as a result of a security breach, we will take
              steps to investigate and remedy the situation at the earliest. We
              will also notify any such individuals whose information may have
              been compromised.
              <br />
              It is imperative that you understand the seriousness associated
              with the security of your digital wallet, the responsibility of
              which is yours. We insist that you take steps to ensure it and any
              information related to your wallet remains secure at all times. If
              you discover an issue related to your wallet, please contact your
              wallet provider.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Data Storage and Retention</h5>
            <p>
              Your Personal Data may be retained for as long as you continue to
              use our platform, have an account registered with us, or for as
              long as it is necessary to fulfill the purposes mentioned in this
              Privacy Policy. Personal Data may be retained even after your
              account has been deactivated, if such retention is reasonably
              necessary to comply with our legal obligations, to resolve
              disputes, prevent fraud and abuse, enforce our Terms or other
              agreements, and/or protect our legitimate interests. We will
              delete any Personal Data where it is no longer required for
              purposes mentioned in this privacy policy.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Your Rights</h5>
            <p>
              If you are a user belonging from the European Economic Area or
              United Kingdom, or are a California resident, you have certain
              rights under the respective European and UK General Data
              Protection Regulations (“GDPR”) and the respective California
              Consumer Privacy Act (“CCPA”).
              <br />
               Collectively, depending the situation you have the following data
              protection rights:
            </p>
            <ul>
              <li>
                {" "}
                The right to access, update or to delete the information we have
                on you. Whenever made possible, you can access, update or
                request deletion of your Personal Data.
              </li>
              <li>
                {" "}
                The right of rectification. You have the right to have your
                information rectified if that information is inaccurate or
                incomplete.
              </li>
              <li>
                {" "}
                The right of restriction. You have the right to request that we
                restrict processing of your personal information.
              </li>
              <li>
                {" "}
                The right to erasure or right to be forgotten. If at any time
                you do not agree with the collection or use of your personal
                information as mentioned in this privacy policy and you want us
                to delete your data.
              </li>
              <li>
                {" "}
                The right to data portability. You have the right to be given a
                copy of the information we have on you in a structured,
                machine-readable and commonly used format and have the right to
                transmit that data to another controller on request.
              </li>
              <li>
                {" "}
                The right to withdraw consent. You may withdraw your consent to
                the processing of data or information for the purposes as
                mentioned in this privacy policy.
              </li>
              <li>
                {" "}
                The right to deactivate cookies. If you wish to restrict or
                block all the cookies which are set by our websites, please use
                the tool available on the particular website (if applicable), or
                refer to the Help function within your browser to learn how to
                manage your settings within your browser.
              </li>
            </ul>
            <p>
              In some situations we may not be able to enact upon your request,
              if there is lawful reason or legal obligation that prevents us
              from timely compliance with such request.
              <br />
              In order to exercise any of the above rights you may drop your
              request with our chatbot.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Changes to Privacy Policy </h5>
            <p>
              MintsClub may make changes to this Privacy Policy at any time. We
              insist all visitors and users to our website to frequently review
              the Privacy Policy, to learn about the latest changes to our
              privacy practices and other operational mechanisms. Any changes to
              our privacy policy will be accompanied with a ‘last updated date’
              for your convenience.
              <br />
              Your continued use of the Website or our platform’s services
              indicates your acknowledgement and/or acceptance of any changes to
              the updated Privacy Policy.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Privacy for Children</h5>
            <p>
              MintsClub does not target, and is not intended to attract, users
              under the age of eighteen (18) years. We do not knowingly collect
              Personal Data from users under the age of eighteen (18) years or
              send requests to users under the age of eighteen (18) years for
              Personal Data.
            </p>
          </div>
          <div className="privacy-content mb-lg-5">
            <h5>Contact and Queries</h5>
            <p>
              If you have any questions or concerns regarding this Privacy
              Policy or Mints.Club data collection or processing practices, or
              if you want to report any security violations to us, drop your
              queries with our chatbot.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
