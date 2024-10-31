import axios from 'axios'
export async function getAll():Promise<any>{
    let res=await axios.get('http://localhost:1234/getAll')
    return res
}