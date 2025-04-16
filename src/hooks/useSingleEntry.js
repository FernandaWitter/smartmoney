import { useEffect, useState } from "react";
import { deleteEntry, getEntryFilterID, saveEntry, updateEntry } from "../services/Entries";
import { getEntryByID } from "../database/services/entryService";
import { connectToDatabase } from "../database/DBConfig";

const useSingleEntry = (id) => {
    const [entry, setEntry] = useState({})

    useEffect(() => {
        const loadEntry = async() => {
            if (id.entryID > 0) {
                const entryItem = await getEntryFilterID(id.entryID)
                setEntry(entryItem)
            }
        }
        loadEntry();
    }, [])
    return [entry, saveEntry, updateEntry, deleteEntry]
}

export default useSingleEntry;