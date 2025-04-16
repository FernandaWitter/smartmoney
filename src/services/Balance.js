import { connectToDatabase } from "../database/DBConfig"
import { getCurrentBalance } from "../database/services/entryService"

export const getBalance = async() => {
    try {
        const db = await connectToDatabase()
        const balance = await getCurrentBalance(db)
        return balance
    } catch (error) {
        console.error(error)
    }
}