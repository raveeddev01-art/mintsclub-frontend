import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { EditorState, convertFromRaw } from "draft-js";
import { convertToHTML } from 'draft-convert';
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const FaqListingTable = ({ tabledata, deleteBlog, limit, page }) => {
    const history = useHistory();
    const [tData, setTData] = useState([]);



    useEffect(() => {
        (async () => {
            const contentData = tabledata && tabledata?.map(async (item) => {
                const editorState = await EditorState.createWithContent(convertFromRaw(JSON.parse(item?.answer)))
                const html_content = await convertToHTML(editorState?.getCurrentContent());
                // const tex = html_content.innerHTML
                return {
                    ...item,
                    answer: html_content
                }
            })

            setTData(await Promise.all(contentData));
        })()

    }, [tabledata]);



    const onDeleteBlog = (id) => {
        swal({
            title: "Are you sure?",
            text:
                "Once deleted, you will not be able to recover this FAQ!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteBlog(id);
            }
        })
    }
    return (
        <>
            <div className="table-responsive">
                <div className="dataTables_wrapper no-footer">
                    <table
                        id="spendingTable"
                        className="display mb-4 dataTablesCard card-table dataTable no-footer"
                        style={{ width: "100%" }}
                    >
                        <thead>
                            <tr role="row">
                                <th
                                    className="pr-0 no-data-img all_spending_strg"
                                    tabIndex={0}
                                    aria-controls="example5"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                >
                                    <div className="custom-control custom-checkbox ml-2">
                                        <strong>No</strong>
                                    </div>
                                </th>
                                <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example5"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Date Published: activate to sort column ascending"
                                >
                                    Answer
                                </th>
                                <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example5"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Date Published: activate to sort column ascending"
                                >
                                    Question
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                tData && tData.map((row, index) => {
                                    return (
                                        <tr role="row" className="odd">
                                            <td className="pr-0 all_spending_checkbox">
                                                <div className="custom-control custom-checkbox ml-2">
                                                    <strong>{limit * page + index + 1}</strong>
                                                </div>
                                            </td>
                                            <td style={{ display: 'flex', whiteSpace: 'normal', overflowY: 'auto', textOverflow: 'ellipsis', height: 100 }}>
                                                <div dangerouslySetInnerHTML={{ __html: row.answer }} />
                                            </td>
                                            <td>
                                                {row.question}
                                            </td>
                                            <td>
                                                <Dropdown className="dropdown ml-auto">
                                                    <Dropdown.Toggle
                                                        variant=""
                                                        className="icon-false p-0 btn-link"
                                                        data-toggle="dropdown"

                                                    >
                                                        <svg
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                                                stroke="#3E4954"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                                                stroke="#3E4954"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                                                stroke="#3E4954"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right"
                                                    >
                                                        <Dropdown.Item
                                                            // href={`/update-faq/${row._id}`, { row }}
                                                            className="dropdown-item text-black">
                                                            <div
                                                                onClick={() =>
                                                                    history.push({
                                                                        pathname: `/update-faq/${row._id}`,
                                                                        state: tabledata[index]
                                                                    })
                                                                }>
                                                                <svg
                                                                    className="mr-3"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                                        stroke="#F24242"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M15 9L9 15"
                                                                        stroke="#F24242"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M9 9L15 15"
                                                                        stroke="#F24242"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                                Edit FAQ
                                                            </div>
                                                        </Dropdown.Item>

                                                        <Dropdown.Item className="dropdown-item text-black">
                                                            <div onClick={() => onDeleteBlog(row._id)}>
                                                                <svg
                                                                    className="mr-3"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                                        stroke="#6F6F6F"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M12 16V12"
                                                                        stroke="#6F6F6F"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M12 8H12.01"
                                                                        stroke="#6F6F6F"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                                Delete FAQ
                                                            </div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>

                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody >
                    </table >

                </div >
            </div >
        </>
    );
};

export default FaqListingTable;
