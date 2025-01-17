import { FetchError } from "ofetch";
export interface FetchCustomConfig {
    setToken?: boolean;
    ignoreErrors?: boolean;
    onError?: (e: FetchError,parsedError?:{statusMessage:string,statusCode:number}) => void;
    onValidationFailed?: (errors: Record<string, string>, e: FetchError) => void;
    toastError?: boolean;
    setErrors?: (errors: { [key: string]: string }) => void;
    // transformer?: (data: any) => any;
    goToLogin?: boolean;
    beforeResponse?: Function;
    debug?: boolean;
    toastValidationFields?: string[];
    messageByStatus?:Record<number,string>;
    ignoreRefreshToken?:boolean
}
