import { useEffect, useState } from "react";
import { getCategoryList } from "../services/Categories";

const useCategories = () => {
    const [categoryList, setCategoryList] = useState()
                            
    useEffect(() => {
        const loadCategories = async() => {
            const catList = await getCategoryList()
            console.log('catLIst in useCategories')
            console.log(catList)
            setCategoryList(catList)
        }
        loadCategories();
    }, [])
    return [categoryList]
}

export default useCategories;