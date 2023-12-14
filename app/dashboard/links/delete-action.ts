// "use server"
import { TempLinkType } from "src/types/tempLink";
export const checkEnvironment = () => {
    let base_url =
      (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
        ? "http://localhost:3000"
        : "https://app.socially.bio"; // https://v2ds.netlify.app
  
    return base_url;
  };
export async function deleteLink(link:TempLinkType) {
    return new Promise(async (resolve, reject) => {
        await fetch(checkEnvironment().concat('/api/links/' + link.slug), {
            method: 'DELETE',

        }).then((res) => {
            resolve(true);
        }).catch((err) => {
            reject(err);
        })
        // .finally(() => {
        //     revalidatePath('/dashboard/links',"page");
        // })
    })
}