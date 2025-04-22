import { connectToDatabase } from "../database/DBConfig"
import { getCategories, getCategorySummary } from "../database/services/entryService"

export const getCategoryList = async() => {
    try {
        const db = await connectToDatabase()
        const catList = await getCategories(db)
        return catList
    } catch (error) {
        console.error(error)
    }
}

export const getCategorySumByDate = async(days, category) => {
    try {
        const db = await connectToDatabase()
        const catList = await getCategorySummary(db, days, category)
        return catList
    } catch (error) {
        console.error(error)
    }
}