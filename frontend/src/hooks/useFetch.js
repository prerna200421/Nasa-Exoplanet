import { useState } from "react";
export default function useFetch(){
    const [ isLoading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchData = async (endpoint, signal, options) => {
        try{
            setError(false);
            setLoading(true);
            const response = await fetch(endpoint, {signal}, options);
            const result =  await response.json();
            if(response.ok){
                return result;
            }
            throw new Error(result);
        }catch(error){
            console.log("error", error);
            setError(error);
        }
        finally{
            setLoading(false);
        }     
    }

    return { isLoading, setLoading, error, setError, fetchData };
}