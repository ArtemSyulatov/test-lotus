import axios from "axios";

const baseUrl = 'https://swapi.dev/api/people/';

type url = {
    text: string,
    currentPage:  number
}
export default class Api {
    static async getData({text, currentPage}: url) {
        const params = new URLSearchParams({})
        if (text) {
            params.append('search', text)
        }
        params.append('page', `${currentPage}`)
        const response = await axios.get(`${baseUrl}?${params.toString()}`);
        return response.data
    }
}
