import { connectToDatabase, clearDatabase, createTables } from "../database/DBConfig";
import { clearInitialized } from "./Welcome";

export const resetApp = async() => {
    try {
        const db = await connectToDatabase();
        await clearDatabase(db);
        await createTables(db);
        await clearInitialized();
    } catch (error) {
        console.error(error);
    }
};