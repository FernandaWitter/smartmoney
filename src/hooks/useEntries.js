import { useEffect, useState } from "react";
import { getEntryList } from "../services/Entries";
import { useIsFocused } from "@react-navigation/native";

const useEntries = (days, category, limit) => {
    const [entries, setEntries] = useState()
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadEntries = async() => {
            const entryList = await getEntryList(days, category, limit)
            setEntries(entryList)
        }
        loadEntries();
    }, [isFocused])
    return [entries]
}

export default useEntries;