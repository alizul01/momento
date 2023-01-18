import sanityClient from '@sanity/client'
import urlBuilder from "@sanity/image-url";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = sanityClient({
    projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-01-18',
    useCdn: true,
    token: import.meta.env.VITE_APP_SANITY_TOKEN,
})

const builder = urlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);