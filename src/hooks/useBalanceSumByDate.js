import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getBalanceSummary } from "../services/Balance";

const useBalanceSumByDate = (days = 7) => {
    const [balanceSum, setBalanceSum] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadBalanceSumByDate() {
            const data = await getBalanceSummary(days)
            console.log('data: ', data)
            setBalanceSum([...data])
        }
        loadBalanceSumByDate();
        console.log('balanceSum', balanceSum)
    }, [days, isFocused]);

    return [balanceSum]
};

export default useBalanceSumByDate