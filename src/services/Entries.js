import { connectToDatabase } from "../database/DBConfig"
import { deleteEntryItem, getEntries, getEntryByID, saveEntryItem, updateEntryItem } from "../database/services/entryService"

export const getEntryList = async(days, category, limit) => {
    try {
        const db = await connectToDatabase()
        const entries = await getEntries(db, days, category, limit)
        return entries
    } catch (error) {
        console.error(error)
    }
}

export const getEntryFilterID = async(id) => {
    try {
        const db = await connectToDatabase()
        const entry = await getEntryByID(db, id)
        return entry
    } catch (error) {
        console.error(error)
    }
}

export const saveEntry = async(data) => {
    try {
        const db = await connectToDatabase()
        return await saveEntryItem(db, data)
    } catch (error) {
        console.error(error)
    }
}

export const updateEntry = async(data) => {
    try {
        console.log('data at updateEntry')
        console.log(data)
        const db = await connectToDatabase()
        return await updateEntryItem(db, data)
    } catch (error) {
        console.error(error)
    }
}

export const deleteEntry = async(id) => {
    try {
        const db = await connectToDatabase()
        await deleteEntryItem(db, id)
    } catch (error) {
        console.error(error)
    }
}