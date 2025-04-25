import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getEntryList } from "../services/Entries";

const useEntries = (days, category, limit) => {
    const [entries, setEntries] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadEntries = async() => {
            const entryList = await getEntryList(days, category, limit);
            setEntries(entryList);
        };

        loadEntries();
    }, [isFocused, days, category]);
    return [entries];
}

export default useEntries;