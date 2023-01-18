import { OAuth2Client } from "google-auth-library"

export default async function GoogleAuthDecoder (token: any)  {
    const CLIENT_ID_GOOGLE = import.meta.env.VITE_APP_CLIENT_ID

    try {
        const client = new OAuth2Client(CLIENT_ID_GOOGLE)

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID_GOOGLE,
        })

        return ticket
    } catch (error) {
        return {
            status: 500,
            data: error
        }
    }
}