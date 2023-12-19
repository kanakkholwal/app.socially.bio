"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { TempLinkType } from "src/types/tempLink";
import LinkOpener from "src/utils/tempLink/deeplink";

export default function OpenerPage({tempLink}:{
    tempLink: TempLinkType
}){

    return <>
    <Card className="text-center">
  <CardHeader>
    <CardTitle>
        Socially Bio
    </CardTitle>
    <CardDescription>
        The Only Link You'll Ever Need
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Click the button below to open the link </p>
  </CardContent>
  <CardFooter>
  <Button onClick={()=>{
        const opener = new LinkOpener(tempLink);
        opener.openLinkInAppOrBrowser();

    }
    }>Open Link</Button>
    
  <Link
    href={tempLink.url}
    target="_blank"
    
      >Open Link</Link>
    
  </CardFooter>
</Card>

    

    </>
}