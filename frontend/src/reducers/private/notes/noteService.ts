import axios from "axios"
import { IToken } from "../../../types"
import { toast } from "react-toastify"

import io from 'socket.io-client';
const socket = io(import.meta.env.VITE_APP_BASE_API, { transports: ['websocket'] });
const toastOptions = {
    autoClose: 2000,
    hideProgressBar: true,
};





const getSharedNotes = async (token: IToken) => {
    const authConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `api/v1/notes/get-shared-notes`, authConfig)
    return data
}

const getPersonalNotes = async (token: IToken) => {
    const authConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `api/v1/notes/get-personal-notes`, authConfig)
    return data
}

const getNote = async (noteId: string,  token: IToken) => {
    const authConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `api/v1/notes/get-note/${noteId}`, authConfig)
    return data
}


// add Task
const createNote = async (taskData: any, token: IToken) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.post(import.meta.env.VITE_APP_BASE_API + `api/v1/notes/create-note`, taskData, config)
    toast.success(data?.message, toastOptions);
    return data
}


const noteService = {
    getSharedNotes,
    getPersonalNotes,
    getNote,
    createNote,

}

export default noteService;