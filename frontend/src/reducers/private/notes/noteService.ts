import axios from "axios"
import { IToken } from "../../../types"
import { toast } from "react-toastify"

// import io from 'socket.io-client';
// const socket = io(import.meta.env.VITE_APP_BASE_API, { transports: ['websocket'] });
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

const getNote = async (noteId: string, token: IToken) => {
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
    // socket.emit('noteCreated', data)
    toast.success(data?.message, toastOptions);
    return data
}


const updateNote = async (nodeId: any, noteData: unknown, token: IToken) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.patch(import.meta.env.VITE_APP_BASE_API + `api/v1/notes/update-note/${nodeId}`, noteData, config)
    toast.success(data?.message, toastOptions);
    return data
}


const deleteNote = async (noteId: any, token: IToken) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.delete(import.meta.env.VITE_APP_BASE_API + `api/v1/notes/delete-note/${noteId}`, config)
    toast.success(data?.message, toastOptions);
    return data
}


const noteService = {
    getSharedNotes,
    getPersonalNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote

}

export default noteService;