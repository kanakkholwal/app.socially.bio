import type { Metadata } from 'next';
import dbConnect from "src/lib/dbConnect";
import TempLink from "src/models/tempLink";
import { TempLinkType } from "src/types/tempLink";
import OpenerPage from "./opener";



export const metadata: Metadata = {
    title: 'Deep Link opener! - Socially Bio',
    description: 'Socially Bio is a free tool to help you manage multiple links for your social media accounts.',
}

export default async function Page({ params }: { params: { slug: string } }) {
    await dbConnect();

    const slug = params.slug

    let tempLink = null;
    const link = await TempLink.findOne({ slug: slug }).lean() as TempLinkType | null;
    if (link) {
        tempLink = JSON.parse(JSON.stringify(link));
    }


    return (<div className='flex justify-center items-center min-h-screen w-full'>
     
      <OpenerPage tempLink={tempLink} />

    </div>)
}