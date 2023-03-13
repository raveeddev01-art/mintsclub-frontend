import React, { Fragment, useState } from "react";
import { useDispatch } from 'react-redux'
import { createFaq } from '../../../store/reducers/faq.Reducer';
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ButtonLoader from "../common/buttonLoader";
import PageTitle from "../../layouts/PageTitle";
import { alert } from "../../../store/reducers/alertSlice"
const FaqForm = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty())
    const [formValues, setFormValues] = useState({
        question: '',
        answer: '',
    })

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({});

    const validate = () => {
        let err = {};

        if (!formValues.question) {
            err.question = "Title is required";
        }
        if (editorState && !(editorState.getCurrentContent().getPlainText('\u0001')) || (editorState.getCurrentContent().getPlainText('\u0001').trim() === '')) {
            err.answer = "Answer is required";
        }
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (Object.keys(err).length > 0) {
            return setErrors(err)
        }

        setLoading(true);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const contentState = editorState.getCurrentContent();
        let stateData = await JSON.stringify(convertToRaw(contentState));
        const raw = {
            question: formValues.question,
            answer: stateData || '',
        };

        const data = await dispatch(createFaq(raw));
        if (data) {
            document.getElementById('create-faq-form').reset();
            dispatch(alert({
                title: `Success`,
                message: `FAQ Created Successfully`,
                severity: "success",
            }))
        }
        if (data?.question) {
            setFormValues({
                question: '',
                answer: '',
            })
            setEditorState(EditorState.createEmpty())
        }
        setLoading(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: undefined })

        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onEditorStateChange = (e) => {
        setErrors({ ...errors, answer: undefined })
        setEditorState(e);
    }

    return (
        <Fragment>
            <PageTitle activeMenu="Create" motherMenu="FAQ" />
            <div className="row">

                <div className="col-xl-12 col-lg-12">

                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Create FAQ</h4>
                        </div>
                        <div className="card-body">
                            <div className="basic-form">
                                <form id="create-faq-form" onSubmit={e => { handleSubmit(e) }}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control input-default "
                                            name="question"
                                            placeholder="Question"
                                            value={formValues.title}
                                            onChange={(e) => { handleChange(e) }}
                                        />
                                        {errors.question && (
                                            <span className="error">{'Question is required'}</span>
                                        )}
                                    </div>

                                    <div className="form-group" style={{ border: '1px solid #F8F8F8', borderRadius: '0.75rem' }}>
                                        <Editor
                                            editorState={editorState}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={onEditorStateChange}
                                        />
                                        {errors.answer && (
                                            <span className="error">{'Answer is required'}</span>
                                        )}
                                    </div>
                                    <div className="mt-3 mt-sm-10">
                                        <ButtonLoader loader={loading} title={'Create FAQ'} classes="btn btn-primary mb-2"
                                            disabled={loading}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default FaqForm;
