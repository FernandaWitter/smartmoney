import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getCategorySumByDate } from "../services/Categories";

const useCategorySumByDate = (days = 7, category = 0) => {
    const [categorySum, setCategorySum] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadCategorySumByDate() {
            const data = await getCategorySumByDate(days, category)
            console.log('data in useCategorySumByDate')
            console.log(data)
            setCategorySum([...data])
        }
        loadCategorySumByDate();
        console.log('categorySum', categorySum)
    }, [isFocused, days, category]);

    return [categorySum]
};

export default useCategorySumByDate