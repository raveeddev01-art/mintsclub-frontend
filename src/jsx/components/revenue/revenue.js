import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

import PageTitle from "../../layouts/PageTitle";
import { getPaymentStats, getPaymentListing } from "../../../store/reducers/paymentReducer"

import PageLoader from "../common/pageLoader";
import SelectOptionField from "../common/selectOptionField";
import TaxRevenueChart from "../charts/Chartjs/TaxRevenueChart";
import RevenueListing from "../listingTable/RevenueListing";
const RevenueReport = () => {

    const [loader, setLoader] = useState(true);
    const [days, setDays] = useState(7);
    const [revenue, setRevenue] = useState([]);
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false)
    const [CSVFormat, setCSVFormat] = useState(null)
    const [pdfFormat, setPdfFormat] = useState(null)
    const dispatch = useDispatch();
    const [layout, setLayout] = useState("graph");

    const options = [
        {
            label: 'Current Day',
            value: 1
        },
        {
            label: 'Week',
            value: 7
        },
        {
            label: 'month',
            value: 30
        },
        {
            label: 'Quarter Year',
            value: 90
        },
        {
            label: 'Half Year',
            value: 182
        },
        {
            label: 'Year',
            value: 365
        },
    ]

    const LaoutOptions = [
        {
            label: 'Graph',
            value: 'graph'
        },
        {
            label: 'Listing',
            value: 'listing'
        },
    ]

    const pdfHeaders = ['Payment Currency', 'Nft Id', 'Chat with User Id', 'User Id', 'Amount', 'Payment Type', 'created At']

    const getPayment = (async () => {
        setLoader(true)
        const revenueData = await dispatch(getPaymentStats({ days }));
        setRevenue(revenueData?.payments)
        setLoader(false)
    })

    useEffect(() => {
        getPayment();
        getRevenueListing();
    }, [days]);

    const onDaysChange = (e) => {
        setDays(e.target.value)
    }

    const getRevenueListing = async () => {
        const listingData = await dispatch(getPaymentListing({ days }))

        const CSVFormat = [];
        const pdfData = [];
        listingData.map(async (item) => {
            item?.payments?.length && item.payments.map(async (record) => {
                let pdfFormatData = [];
                delete record?._id
                delete record?.transactionSignature
                CSVFormat.push(record);
                pdfFormatData = [record?.paymentCurrency ?? 'N/A', record?.nftId ?? 'N/A', record?.chatWithUserId ?? 'N/A', record?.userId ?? 'N/A', record?.amount ?? 'N/A', record?.paymentType ?? 'N/A', record?.createdAt ?? 'N/A']
                pdfData.push(pdfFormatData);
            })
        })
        setPdfFormat(pdfData)
        setCSVFormat(CSVFormat)
        setListing(listingData)
        setLoader(false)
    }

    const onLayoutChange = (e) => {
        setLayout(e.target.value);

        if (e.target.value === 'graph') {
            getPayment();
        }
        else if (e.target.value === 'listing') {
            getRevenueListing();
        }

    }

    const download_pdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            headStyles: { cellWidth: 26, fillColor: '#9945fe' },
            head: [pdfHeaders],
            body: pdfFormat
        });
        doc.save("revenue_report.pdf");
    }

    return (
        <Fragment>
            <PageTitle activeMenu="Report" motherMenu="Revenue" />
            {loader ? <PageLoader /> :
                <div className="revenue-page">
                    <div className="row justify-content-end align-items-center">

                        {layout === "listing" && CSVFormat && <CSVLink
                            data={CSVFormat}
                            filename={"revenue-report.csv"}
                            className="btn btn-primary mr-3 mb-3"
                            target="_blank"
                        >Download CSV</CSVLink>
                        }

                        {layout === "listing" && pdfFormat && <div className="mr-3">
                            <button
                                className="btn btn-primary btn-block mb-3"
                                style={{ minWidth: 120, cursor: 'pointer' }}
                                onClick={() => download_pdf()}
                                title="Learn More"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            >Download Pdf</button>
                        </div>}

                        <SelectOptionField onChange={onLayoutChange} filter={layout} options={LaoutOptions} />
                        <SelectOptionField onChange={onDaysChange} filter={days} options={options} />
                    </div>

                    {layout === "graph" && revenue !== [] && <TaxRevenueChart tabledata={revenue} days={days} />}
                    {layout === "listing" && <RevenueListing tabledata={listing} />}

                </div>}
        </Fragment>
    );
};

export default RevenueReport;
