import { Separator } from "@/components/ui/separator";

export default function QrCode() {
    return (<div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium">
                QR Code
            </h3>
            <p className="text-sm text-muted-foreground">
                Customize the appearance of your QR code.
            </p>
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-2 w-full mb-5">
        </div>
    </div>)
}