import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export const apiValue = {
    apiLink: 'https://api.unsplash.com/',
    client_id: 'Eygz1wyKytw6b_8_WeidUrWthiPiXBRjWyWiIvavsh4',
}

type UseFetchProps<T> = {
    error: boolean,
    errorInfo?: string,
    response: T | null,
    isLoading: boolean,
    reload: boolean,
    setReload: Dispatch<SetStateAction<boolean>>
}


export const useFetch = <T>(action: string): UseFetchProps<T> => {

    const [reload, setReload] = useState<boolean>(false);
    const [dataFetched, setDataFetched] = useState<{
        error: boolean,
        errorInfo?: string | undefined,
        response: T | null,
        isLoading: boolean,
    }>({ response: null, isLoading: true, error: false, errorInfo: '' });

    const dataFetch = useCallback(async (): Promise<void> => {
        try {
            setDataFetched(prevState => ({ ...prevState, isLoading: true }));
            const response = await fetch(apiValue.apiLink + action+ '/?' + new URLSearchParams({ client_id: apiValue.client_id}));
            if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
            const jsonResponse = await response.json();
            setDataFetched(prevState => ({ ...prevState, response: jsonResponse, isLoading: false, error: false }));
        } catch (e: any) {
            setDataFetched(prevState => ({ ...prevState, isLoading: false, errorInfo: e.message, error: true }));
        }
    }, [action, reload]);


    useEffect(() => {
        dataFetch();
        return (() => {
            setReload(false);
            setDataFetched({ response: null, isLoading: false, error: false, errorInfo: '' })
        });
    }, [action, dataFetch, reload])

    return { ...dataFetched, reload, setReload };
}