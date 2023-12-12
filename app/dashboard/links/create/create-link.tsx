"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, Reducer, useReducer } from "react";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { LuLinkedin } from "react-icons/lu";
import { PiInstagramLogoBold } from "react-icons/pi";
import { RiLinksFill } from "react-icons/ri";
import { TbFidgetSpinner } from "react-icons/tb";

import toast from "react-hot-toast";
import { parse } from 'tldjs';

interface StateType {
    url: string,
    isUrlValid: null | boolean,
    expiresAt: Date,
    opener: string,
    shortUrl: string,
    action: {
        loading: boolean,
        error: boolean,
        success: boolean,
        message: string
    }
}

type ActionType =
    | { type: "UPDATE_URL"; payload: string }
    | { type: "UPDATE_EXPIRY_DATE"; payload: Date }
    | { type: "UPDATE_OPENER_TYPE"; payload: string }
    | { type: "UPDATE_URL_VALIDITY"; payload: null | boolean }
    | { type: "UPDATE_SHORT_URL"; payload: string }
    | {
        type: "UPDATE_SUCCESS"; payload: {
            shortUrl: string,
            action: {
                loading: boolean,
                error: boolean,
                success: boolean,
                message: string
            }
        }
    }
    | {
        type: "UPDATE_ACTION"; payload: {
            loading: boolean;
            error: boolean;
            success: boolean;
            message: string;
        }
    };

const initialState: StateType = {
    url: "",
    isUrlValid: null,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    opener: "others",
    shortUrl: "",
    action: {
        loading: false,
        error: false,
        success: false,
        message: ""
    }
};

const reducer: Reducer<StateType, ActionType> = (state, action) => {
    switch (action.type) {
        case "UPDATE_URL":
            return {
                ...state,
                url: action.payload
            };
        case "UPDATE_EXPIRY_DATE":
            return {
                ...state,
                expiresAt: action.payload
            };
        case "UPDATE_OPENER_TYPE":
            return {
                ...state,
                opener: action.payload
            };
        case "UPDATE_URL_VALIDITY":
            return {
                ...state,
                isUrlValid: action.payload
            };
        case "UPDATE_ACTION":
            return {
                ...state,
                action: action.payload
            };
        case "UPDATE_SUCCESS":
            return {
                ...state,
                shortUrl: action.payload.shortUrl,
                action: action.payload.action
            };
        default:
            return state;
    }
};

const verifyUrl = (url: string): any => {
    return parse(url);
};

const openers = [
    {
        label: "Youtube",
        id: "youtube",
        icon: <BsYoutube className="w-6 h-6 mr-2 text-red-600" />
    },
    {
        label: "X / Twitter",
        id: "twitter",
        icon: <BsTwitterX className="w-6 h-6 mr-2 text-slate-900" />
    },
    {
        label: "Instagram",
        id: "instagram",
        icon: <PiInstagramLogoBold className="w-6 h-6 mr-2 text-violet-900" />
    },
    {
        label: "LinkedIn",
        id: "linkedin",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />
    },
    {
        label: "Others",
        id: "others",
        icon: <RiLinksFill className="w-6 h-6 mr-2 text-violet-900" />
    },
] as {
    label: string,
    id: string,
    icon: React.ReactNode
}[]
export function CreateLinkForm() {
    const [state, dispatch]: [StateType, Dispatch<ActionType>] = useReducer(reducer, initialState);

    const createTempLink = async (url: string, expiresAt: string, opener: string) => {
        dispatch({
            type: "UPDATE_ACTION",
            payload: {
                loading: true,
                error: false,
                success: false,
                message: ""
            }
        })
        return new Promise(async (resolve, reject) => {
            await fetch("/api/links/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url,
                    expiresAt,
                    opener
                })
            }).then(async (res) => {
                const response = await res.json();
                const { data } = response;
                dispatch({
                    type: "UPDATE_SUCCESS",
                    payload: {
                        shortUrl: data.slug,
                        action: {
                            loading: false,
                            error: false,
                            success: true,
                            message: "Shorten Link Generated"
                        }
                    }
                })
                resolve(data);
            }).catch((err) => {
                dispatch({
                    type: "UPDATE_ACTION",
                    payload: {
                        loading: false,
                        error: true,
                        success: false,
                        message: "Error Generating Shorten Link"
                    }
                })
                reject(err);
            })
        })
    }

    return (
        <div className="border border-border p-4 rounded-xl max-w-3xl space-y-4">
            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="url" className="mb-3">URL:</Label>
                <Input placeholder="Enter URL"
                    id="url"
                    value={state.url}
                    variant="fluid"
                    onChange={(e) => {
                        dispatch({ type: "UPDATE_URL", payload: e.target.value })
                        const result = verifyUrl(e.target.value);
                        // console.log(result)
                        dispatch({ type: "UPDATE_URL_VALIDITY", payload: (result.isValid && result.tldExists) })
                    }} />
                {state.isUrlValid === false && <span className="text-xs font-semibold text-red-500">Enter a valid url</span>}
            </div>
            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="expiresAt">
                    Link Automatically Expires after
                </Label>
                <DatePicker
                    date={state.expiresAt}
                    setDate={(date) => {
                        dispatch({ type: "UPDATE_EXPIRY_DATE", payload: date })
                    }}
                />
            </div>
            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="expiresAt">
                    Select a link Opener
                </Label>
                <div className="grid gap-3 w-full items-center grid-cols-4 md:grid-cols-3 mt-3">
                    {openers.map((opener, i) => {
                        return (<button
                            onClick={() => {
                                if (state.opener === opener.id)
                                    return;
                                dispatch({
                                    type: "UPDATE_OPENER_TYPE",
                                    payload: opener.id
                                })
                            }}
                            className={"h-12  rounded-xl p-3 hover:bg-primary/5 border border-border flex items-center justify-center" + (state.opener === opener.id ? " border-primary bg-primary/10 hover:bg-primary/10" : "")} key={opener.id}>
                            {opener.icon}
                            <span className="text-lg font-medium text-slate-900">
                                {opener.label}
                            </span>
                        </button>)
                    })}

                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                {(state.action.error) && <>
                    <p className={"px-5 py-2 rounded-md text-sm " + (state.action.error ? " bg-red-200 text-red-500" : "") + " " + (state.action.error ? " bg-green-200 text-green-500" : "")}>
                        {state.action.message}
                    </p>

                </>}
                {state.action.success && <>
                    <p className="px-5 py-2 rounded-md text-sm bg-primary/10 text-primary">
                        <a href={process.env.NEXT_PUBLIC_APP_LINK + state.shortUrl} target="_blank" className="underline">
                            {process.env.NEXT_PUBLIC_APP_LINK}{state.shortUrl}
                        </a>
                        <button className="ml-2" onClick={() => {
                            navigator.clipboard.writeText(process.env.NEXT_PUBLIC_APP_LINK + state.shortUrl);
                            toast.success("Copied to clipboard")
                        }
                        }>
                            Copy
                        </button>

                    </p>
                </>}
                {state.action.loading && <>
                    <TbFidgetSpinner className="h-12 w-12 text-primary animate-spin" />
                </>}
            </div>
            <Button className="w-full" size="lg"
                onClick={() => {
                    if (state.url.trim() === "" || state.isUrlValid === false) {
                        toast.error("Enter a valid url");
                        return;
                    }

                    console.log(state.url, state.expiresAt.toISOString(), state.opener)
                    toast.promise(createTempLink(state.url, state.expiresAt.toISOString(), state.opener), {
                        loading: "Generating Shorten Link",
                        success: (data: any) => {
                            return "Shorten Link Generated"
                        },
                        error: (err: any) => {

                            return "Error Generating Shorten Link"
                        }
                    })


                }}
                disabled={state.action.loading}>
                Generate Shorten Link
            </Button>


        </div>
    );
}
