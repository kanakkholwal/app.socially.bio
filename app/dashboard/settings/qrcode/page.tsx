"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { useQrStore } from "./store";



export default function QrCode() {
    const canvasRef = useRef<HTMLDivElement>(null); // Change HTMLElement to HTMLDivElement
    const qrCodeRef = useRef<QRCodeStyling | null>(null); // Set the type to QRCodeStyling or null
    const getQrOptions = useQrStore((state) => {
        console.log(state);
        return state.getQrOptions
    });

    useEffect(() => {
        if (!qrCodeRef.current && canvasRef.current) {
            const options = getQrOptions();
            qrCodeRef.current = new QRCodeStyling(options);

            qrCodeRef.current.append(canvasRef.current);
        }
    }, []);
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
                    <AccordionItem value="main-options">
                        <AccordionTrigger>
                            Main Options
                        </AccordionTrigger>
                        <AccordionContent>
                            <MainOptionsSelector />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dot-options">
                        <AccordionTrigger>
                            Dot Options
                        </AccordionTrigger>
                        <AccordionContent>
                            <DotOptionsSelector />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="corner-square-options">
                        <AccordionTrigger>
                            Corner Square Options
                        </AccordionTrigger>
                        <AccordionContent className="grid gap-3 p-2">
                            <CornersSquareSelector />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="corner-dot-options">
                        <AccordionTrigger>
                            Corner Square Options
                        </AccordionTrigger>
                        <AccordionContent className="grid gap-3 p-2">
                            <CornersSquareSelector />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="background-options">
                        <AccordionTrigger>
                            Background Options
                        </AccordionTrigger>
                        <AccordionContent className="grid gap-3 p-2">
                            <BackgroundOptionSelctor />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="image-options">
                        <AccordionTrigger>
                            Image Options
                        </AccordionTrigger>
                        <AccordionContent className="grid gap-3 p-2">
                            <ImageOptionSelector />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
            <div className="flex-1">
                <div className="flex items-center justify-center">
                    <div id="canvas" ref={canvasRef} />
                </div>
            </div>

        </div>
    </div>)
}
function ColorSelector({ id, color, gradient }: {
    id: string,
    color: string,
    gradient: {
        type: string,
        rotation: number,
        colorStops: {
            offset: number,
            color: string
        }[]
    } | null
}) {

    return (<div className="grid w-full gap-4">
        <div className="grid w-full gap-4">
            <Label htmlFor="dotColorType">Color Type</Label>
            <RadioGroup defaultValue="single" className="flex flex-wrap items-center">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id={id + "_single"} />
                    <Label htmlFor={id + "_single"}>
                        Single
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gradient" id={id + "_gradient"} />
                    <Label htmlFor={id + "_gradient"}>
                        Gradient
                    </Label>
                </div>
            </RadioGroup> </div>
        {gradient !== null ? <div>
            <RadioGroup defaultValue="linear" className="flex flex-wrap items-center">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="linear" id={id + "_linear"} />
                    <Label htmlFor={id + "_linear"}>
                        Linear
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="radial" id={id + "_radial"} />
                    <Label htmlFor={id + "_radial"}>
                        Radial
                    </Label>
                </div>
            </RadioGroup>
            <div className={"grid gap-1.5 grid-cols-2 grid-cols-" + gradient.colorStops.length}>
                {gradient.colorStops.map((item, index) => {
                    return <div key={index} className="grid gap-1.5">
                        <Label htmlFor={id + "_color_" + index}>Color {index + 1}</Label>
                        <Input id={id + "_color_" + index} type="color" variant="fluid" placeholder="color" value={item.color} />
                    </div>
                })}

            </div>
            <div className="grid gap-1.5">
                <Label htmlFor={id + "_rotation"}>Rotation</Label>
                <Input id={id + "_rotation"} type="number" variant="fluid" placeholder="rotation" />
            </div>
        </div> : <>
            <Input id={id + "_color"} type="color" variant="fluid" placeholder="color" value={color} />
        </>}

    </div>)
}
function MainOptionsSelector() {
    return (<>
        <div className="grid w-full gap-1.5 mb-4">
            <Label htmlFor="data">Data</Label>
            <Input id="data" type="text" variant="fluid" value={"https://socially.bio/sociallybio"} disabled />
        </div>
        <div className="grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
            <div className="grid gap-1.5">
                <Label htmlFor="width">Width</Label>
                <Input id="width" type="number" variant="fluid" placeholder="width of QR" />
            </div>
            <div className="grid  gap-1.5">
                <Label htmlFor="height">Height</Label>
                <Input id="height" type="number" variant="fluid" placeholder="height of QR" />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="margin">Margin</Label>
                <Input id="margin" type="number" variant="fluid" placeholder="margin of QR" />
            </div>
        </div>
    </>)
}
function DotOptionsSelector() {

    return (<>
        <div className="grid w-full gap-1.5 p-2">
            <Label htmlFor="dotStyle">Dots Style</Label>
            <Select >
                <SelectTrigger className="w-[180px]" id="dotStyle">
                    <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                    {["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"].map((item) => {
                        return <SelectItem value={item} key={item}>{item.replace("-", " ")}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
        <ColorSelector id="dot" color="red" gradient={{
            type: "linear",
            rotation: Math.PI / 2,
            colorStops: [{ offset: 0, color: 'blue' }, { offset: 1, color: 'green' }]
        }} />
    </>)
}
function ImageOptionSelector() {

    return (<>
        <div className="flex items-center w-full gap-2 justify-between">
            <Label htmlFor="hide-background-dots">
                Hide Background Dots
            </Label>
            <Switch id="hide-background-dots" />
        </div>
        <div className="grid w-full gap-2">
            <Label htmlFor="hide-background-dots">
                Image Size
            </Label>
            <Slider defaultValue={[0.2]} max={1} step={0.1} />
        </div>
        <div className="grid w-full grid-cols-2 items-center gap-1.5">
            <Label htmlFor="margin">Margin</Label>
            <Input id="margin" type="number" variant="fluid" placeholder="margin of QR" />
        </div>
    </>)
}
function CornersSquareSelector() {

    return (<>
        <div className="grid w-full gap-1.5 p-2">
            <Label htmlFor="dotStyle">Dots Style</Label>
            <Select >
                <SelectTrigger className="w-[180px]" id="dotStyle">
                    <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                    {["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"].map((item) => {
                        return <SelectItem value={item} key={item}>{item.replace("-", " ")}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
        <ColorSelector id="dot" color="red" gradient={{
            type: "linear",
            rotation: Math.PI / 2,
            colorStops: [{ offset: 0, color: 'blue' }, { offset: 1, color: 'green' }]
        }} />
    </>)
}
function CornersDotSelector() {

    return (<>
        <div className="grid w-full gap-1.5 p-2">
            <Label htmlFor="dotStyle">Dots Style</Label>
            <Select >
                <SelectTrigger className="w-[180px]" id="dotStyle">
                    <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                    {["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"].map((item) => {
                        return <SelectItem value={item} key={item}>{item.replace("-", " ")}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
        <ColorSelector id="dot" color="red" gradient={{
            type: "linear",
            rotation: Math.PI / 2,
            colorStops: [{ offset: 0, color: 'blue' }, { offset: 1, color: 'green' }]
        }} />
    </>)
}
function BackgroundOptionSelctor() {
    return (<>
        <div className="grid w-full gap-1.5 p-2">
            <Label htmlFor="dotStyle">Dots Style</Label>
            <Select >
                <SelectTrigger className="w-[180px]" id="dotStyle">
                    <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                    {["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"].map((item) => {
                        return <SelectItem value={item} key={item}>{item.replace("-", " ")}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
        <ColorSelector id="dot" color="red" gradient={{
            type: "linear",
            rotation: Math.PI / 2,
            colorStops: [{ offset: 0, color: 'blue' }, { offset: 1, color: 'green' }]
        }} />
    </>)
}