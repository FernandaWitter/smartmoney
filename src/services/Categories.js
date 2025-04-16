import { connectToDatabase } from "../database/DBConfig"
import { getCategories } from "../database/services/entryService"

export const getCategoryList = async() => {
    try {
        const db = await connectToDatabase()
        const catList = await getCategories(db)
        return catList
    } catch (error) {
        console.error(error)
    }
}
