import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'counter',
    initialState: {
        alertData: {
            title: null,
            message: null,
            severity: "success",
            show: false,
        }

    },
    reducers: {
        alert: (state, data) => {
            state.alertData = {
                title: data?.payload?.title,
                message: data?.payload?.message,
                severity: data?.payload?.severity,
                show: true,
            }
        },
        hideAlert: state => {
            state.alertData = {
                ...state.alertData,
                title: null,
                message: null,
                show: false,
            }
        },

    }
})

// each case under reducers becomes an action
export const { alert, hideAlert } = alertSlice.actions

export default alertSlice.reducer