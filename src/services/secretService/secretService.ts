import axios from "axios";
import {ROUTES} from "../../constants.ts";
import {EntityLocation} from "../../types/location.ts";

export default class SecretService {
    // 007

    exposeSecretLocations(): Promise<EntityLocation[]> {
        return axios.get(ROUTES.SECRET)
            .then(d => JSON.parse(atob(d.data.message))) as Promise<EntityLocation[]>
    }

}