import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import Link from "next/link";
import React from "react";

// searchable contents 
import { routes, routeType } from "./routes.constants";

export default function Search() {
    const [open, setOpen] = React.useState(false);


    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <div className="w-full flex-1 md:w-auto md:flex-none">
            <button role="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen((open) => !open)

                }}
                className="inline-flex items-center whitespace-nowrap rounded-3xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-transparent border-dashed bg-slate-100 shadow-sm  hover:border-tertiary  h-9 px-4 py-2 relative justify-start text-sm text-muted-foreground sm:pr-12  max-w-full w-64 lg:w-96">
                <span className="hidden lg:inline-flex">Search Anything...</span>
                <span className="inline-flex lg:hidden">Search...</span>

                <kbd className="pointer-events-none absolute right-2 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted text-slate-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {routes.map((item:routeType, index:number) => {
                        return (<CommandGroup heading={item.title} key={"group_" + index}>
                            {item.items.map((item, index) => {
                                return (<Link href={item.href} key={"item_" + index} className="cursor-pointer">
                                    <CommandItem>

                                        <item.icon className="mr-2 h-4 w-4" />


                                        <span>{item.name}</span>
                                    </CommandItem>
                                </Link>)
                            })}
                        </CommandGroup>
                        )
                    })}

                </CommandList>
            </CommandDialog>
        </div>
    )
}