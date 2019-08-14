const BASE = '/'

export default async function fetchJson (url,option){
    try {
        let res = await fetch(BASE+url,option);
        const {ok,data,err} = await res.json();
        if(!ok){
            console.error(err);
            throw err;
        }else{
            return data
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}