import { useEffect, useState } from "react";

import { getBalance } from "../services/Balance";
import { useIsFocused } from "@react-navigation/native";

const useBalance = () => {
    const [balance, setBalance] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadBalance() {
            const value = await getBalance()
            isNaN(value) ? setBalance((0).toFixed(2)) : setBalance(value)
        }
        loadBalance();
    }, [balance, isFocused]);
    return [balance]
};

export default useBalance