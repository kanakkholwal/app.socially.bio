"use server"
import { revalidatePath } from "next/cache";
import { TempLinkType } from "src/types/tempLink";

export async function deleteLink(link:TempLinkType) {
    return new Promise(async (resolve, reject) => {
        await fetch('/api/links/' + link.slug, {
            method: 'DELETE'
        }).then((res) => {
            revalidatePath('/dashboard/links');
            resolve(true);
        }).catch((err) => {
            reject(err);
        })
    })
}