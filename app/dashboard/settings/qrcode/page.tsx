import { Separator } from "@/components/ui/separator";

export default function QrCode() {
    return (<div className="space-y-6 p-10 pb-16 w-full">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight"> QR Code</h2>
            <p className="text-muted-foreground">
                Customize the appearance of your QR code.
            </p>
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-2 w-full mb-5">
        </div>
    </div>)
}