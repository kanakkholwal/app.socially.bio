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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHeaderStore } from "../store";


export default function HeaderEditor() {
    const [
        profileName,
        profilePicture,
        profileBio,
        setProfileName,
        setProfilePicture,
        setProfileBio,
    ] = useHeaderStore(state => [state.profileName, state.profilePicture, state.profileBio, state.setProfileName, state.setProfilePicture, state.setProfileBio])

    return (<>
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Edit Header
                </CardTitle>
                <CardDescription>
                    Edit the header of your profile and see the changes in real time.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input type="file"
                        accept="image/*"
                        id="profilePicture" variant="fluid"
                        onChange={(e) =>{
                            if(!e.target.files) return
                            const files = e.target.files
                            if(!files) return
                            const reader = new FileReader()
                            reader.onload = (e) => {
                                setProfilePicture(e.target?.result as string)
                            }
                            reader.readAsDataURL(files[0])
                        
                        }}
                    />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="profileName">Profile Name</Label>
                    <Input placeholder="Your Profile Name here." id="profileName" variant="fluid"
                        value={profileName} onChange={e => setProfileName(e.target.value)} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="profileBio">Profile Bio</Label>
                    <Textarea placeholder="Your Bio here." id="profileBio" variant="fluid"
                        value={profileBio} onChange={e => setProfileBio(e.target.value)} />
                </div>
            </CardContent>
            <CardFooter>
                <Button>
                    Save Changes
                </Button>
            </CardFooter>
        </Card>

    </>)
}