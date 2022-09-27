import React, { useEffect } from 'react';
import './faqs.scss';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg2.png';
import { Accordion, Card } from 'react-bootstrap';
import { faqsBanner, faqsData } from '../../utils/exportData';

const Faqs = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Banner
        subHeading={faqsBanner.subHeading}
        heading={faqsBanner.heading}
        content={faqsBanner.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      <div className="padding-wrapper faqs">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              <div
                className="faqs-accordion accordion accordion-flush mx-auto"
                id="accordionFlushExample"
              >
                {faqsData.map((faq, id) => {
                  return (
                    <div className="accordion-item mb-4" key={id}>
                      <h2 className="accordion-header" id={`${id}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#c${id}`}
                          aria-expanded="false"
                          aria-controls={`c${id}`}
                        >
                          <span>Q{`${id + 1}.`}</span>
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`c${id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`${id}`}
                      >
                        <div className="accordion-body">
                          <p>{faq.ans}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
