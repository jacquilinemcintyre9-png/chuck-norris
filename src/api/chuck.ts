import type { ChuckJoke } from "../types/joke"

const API = "https://api.chucknorris.io"

export async function getRandomJoke(): Promise<ChuckJoke> {

    const response = await fetch(`${API}/jokes/random`)

    if (!response.ok) {

        throw new Error("Ошибка API")

    }

    return response.json()

}