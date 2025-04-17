import { useEffect, useState } from "react";

import { getBalanceSummary } from "../services/Balance";
import { useIsFocused } from "@react-navigation/native";

const useBalanceSumByDate = (days = 7) => {
    const [balanceSum, setBalanceSum] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadBalanceSumByDate() {
            const data = await getBalanceSummary(days)
            setBalanceSum([...data])
        }
        loadBalanceSumByDate();
    }, [days, isFocused]);

    return [balanceSum]
};

export default useBalanceSumByDate