import SecretService from "../../services/secretService/secretService.ts";
import {useEffect, useState} from "react";
import {EntityLocation} from "../../types/location.ts";
import {AxiosError} from "axios";


export function useLocations() {
    const [locations, setLocations] = useState<EntityLocation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError | null>(null)
    const secretService = new SecretService()

    useEffect(() => {
        try {
            setLoading(true)
            secretService.exposeSecretLocations()
                .then((secretLocations) => {
                setLocations(secretLocations)
            })
        } catch(err) {
            setError(err as AxiosError)
        } finally {
            setLoading(false)
        }

        return () => setLocations(null)
    },[])

    return {locations, loading, error}
}