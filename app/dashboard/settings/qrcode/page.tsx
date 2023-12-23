import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function QrCode() {
    return (<div className="space-y-6 p-10 pb-16 w-full">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight"> QR Code</h2>
            <p className="text-muted-foreground">
                Customize the appearance of your QR code.
            </p>
        </div>
        <Separator />
        <div className="flex items-stretch justify-between gap-2 w-full mb-5">
            <div className="flex-1">
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can disable it if you
                            prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
            <div className="flex-1">
            </div>

        </div>
    </div>)
}