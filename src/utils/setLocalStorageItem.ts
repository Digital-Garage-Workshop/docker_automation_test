export const setLocalStorageItem =(props:{item:any, itemName:string})=>{
    const {item,itemName} =props

    const updatedItem = JSON.stringify(item)

    if(typeof window !== "undefined"){
        localStorage.setItem(itemName, updatedItem)
    }
}