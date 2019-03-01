/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v12.0.14.0 (NJsonSchema v9.13.18.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})
export class Client {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:3000/api";
    }

    hello(): Observable<void> {
        let url_ = this.baseUrl + "/root/hello";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processHello(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processHello(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processHello(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:3000/api";
    }

    register(registerVm: RegisterVm): Observable<UserVm> {
        let url_ = this.baseUrl + "/user/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(registerVm);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processRegister(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRegister(<any>response_);
                } catch (e) {
                    return <Observable<UserVm>><any>_observableThrow(e);
                }
            } else
                return <Observable<UserVm>><any>_observableThrow(response_);
        }));
    }

    protected processRegister(response: HttpResponseBase): Observable<UserVm> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 201) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result201: any = null;
            let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result201 = resultData201 ? UserVm.fromJS(resultData201) : new UserVm();
            return _observableOf(result201);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
            return throwException("A server error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UserVm>(<any>null);
    }

    login(loginVm: LoginVm): Observable<any> {
        let url_ = this.baseUrl + "/user/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(loginVm);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processLogin(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLogin(<any>response_);
                } catch (e) {
                    return <Observable<any>><any>_observableThrow(e);
                }
            } else
                return <Observable<any>><any>_observableThrow(response_);
        }));
    }

    protected processLogin(response: HttpResponseBase): Observable<any> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 201) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result201: any = null;
            let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result201 = resultData201 !== undefined ? resultData201 : <any>null;
            return _observableOf(result201);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
            return throwException("A server error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<any>(<any>null);
    }
}

@Injectable({
    providedIn: 'root'
})
export class TodoClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:3000/api";
    }

    create(todoParams: TodoParams): Observable<TodoVm> {
        let url_ = this.baseUrl + "/todo";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(todoParams);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<TodoVm>><any>_observableThrow(e);
                }
            } else
                return <Observable<TodoVm>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<TodoVm> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 201) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result201: any = null;
            let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result201 = resultData201 ? TodoVm.fromJS(resultData201) : new TodoVm();
            return _observableOf(result201);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
            return throwException("A server error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TodoVm>(<any>null);
    }

    getall(isCompleted?: boolean | null | undefined, level?: any[] | null | undefined): Observable<TodoVm[]> {
        let url_ = this.baseUrl + "/todo?";
        if (isCompleted !== undefined)
            url_ += "isCompleted=" + encodeURIComponent("" + isCompleted) + "&"; 
        if (level !== undefined)
            level && level.forEach((item, index) => { 
                for (let attr in item)
        			if (item.hasOwnProperty(attr)) {
        				url_ += "level[" + index + "]." + attr + "=" + encodeURIComponent("" + (<any>item)[attr]) + "&";
        			}
            });
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetall(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetall(<any>response_);
                } catch (e) {
                    return <Observable<TodoVm[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<TodoVm[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetall(response: HttpResponseBase): Observable<TodoVm[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(TodoVm.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
            return throwException("A server error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TodoVm[]>(<any>null);
    }

    update(todoVm: TodoVm): Observable<TodoVm> {
        let url_ = this.baseUrl + "/todo";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(todoVm);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(<any>response_);
                } catch (e) {
                    return <Observable<TodoVm>><any>_observableThrow(e);
                }
            } else
                return <Observable<TodoVm>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<TodoVm> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 201) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result201: any = null;
            let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result201 = resultData201 ? TodoVm.fromJS(resultData201) : new TodoVm();
            return _observableOf(result201);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
            return throwException("A server error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TodoVm>(<any>null);
    }

    delete(id: string): Observable<TodoVm[]> {
        let url_ = this.baseUrl + "/todo/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<TodoVm[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<TodoVm[]>><any>_observableThrow(response_);
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<TodoVm[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(TodoVm.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
            return throwException("A server error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TodoVm[]>(<any>null);
    }
}

export class RegisterVm implements IRegisterVm {
    username!: string;
    password!: string;
    firstName?: string | null;
    lastName?: string | null;

    constructor(data?: IRegisterVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.username = data["username"] !== undefined ? data["username"] : <any>null;
            this.password = data["password"] !== undefined ? data["password"] : <any>null;
            this.firstName = data["firstName"] !== undefined ? data["firstName"] : <any>null;
            this.lastName = data["lastName"] !== undefined ? data["lastName"] : <any>null;
        }
    }

    static fromJS(data: any): RegisterVm {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username !== undefined ? this.username : <any>null;
        data["password"] = this.password !== undefined ? this.password : <any>null;
        data["firstName"] = this.firstName !== undefined ? this.firstName : <any>null;
        data["lastName"] = this.lastName !== undefined ? this.lastName : <any>null;
        return data; 
    }
}

export interface IRegisterVm {
    username: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
}

export class UserVm implements IUserVm {
    createdAt?: Date | null;
    updatedAt?: Date | null;
    id?: string | null;
    username!: string;
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    role?: UserVmRole | null;

    constructor(data?: IUserVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.createdAt = data["createdAt"] ? new Date(data["createdAt"].toString()) : <any>null;
            this.updatedAt = data["updatedAt"] ? new Date(data["updatedAt"].toString()) : <any>null;
            this.id = data["id"] !== undefined ? data["id"] : <any>null;
            this.username = data["username"] !== undefined ? data["username"] : <any>null;
            this.firstName = data["firstName"] !== undefined ? data["firstName"] : <any>null;
            this.lastName = data["lastName"] !== undefined ? data["lastName"] : <any>null;
            this.fullName = data["fullName"] !== undefined ? data["fullName"] : <any>null;
            this.role = data["role"] !== undefined ? data["role"] : <any>null;
        }
    }

    static fromJS(data: any): UserVm {
        data = typeof data === 'object' ? data : {};
        let result = new UserVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>null;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>null;
        data["id"] = this.id !== undefined ? this.id : <any>null;
        data["username"] = this.username !== undefined ? this.username : <any>null;
        data["firstName"] = this.firstName !== undefined ? this.firstName : <any>null;
        data["lastName"] = this.lastName !== undefined ? this.lastName : <any>null;
        data["fullName"] = this.fullName !== undefined ? this.fullName : <any>null;
        data["role"] = this.role !== undefined ? this.role : <any>null;
        return data; 
    }
}

export interface IUserVm {
    createdAt?: Date | null;
    updatedAt?: Date | null;
    id?: string | null;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    role?: UserVmRole | null;
}

export class ApiException implements IApiException {
    statusCode?: string | null;
    message?: string | null;
    status?: string | null;
    error?: string | null;
    errors?: any | null;
    timestamp?: string | null;
    path?: string | null;

    constructor(data?: IApiException) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.statusCode = data["statusCode"] !== undefined ? data["statusCode"] : <any>null;
            this.message = data["message"] !== undefined ? data["message"] : <any>null;
            this.status = data["status"] !== undefined ? data["status"] : <any>null;
            this.error = data["error"] !== undefined ? data["error"] : <any>null;
            this.errors = data["errors"] !== undefined ? data["errors"] : <any>null;
            this.timestamp = data["timestamp"] !== undefined ? data["timestamp"] : <any>null;
            this.path = data["path"] !== undefined ? data["path"] : <any>null;
        }
    }

    static fromJS(data: any): ApiException {
        data = typeof data === 'object' ? data : {};
        let result = new ApiException();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["statusCode"] = this.statusCode !== undefined ? this.statusCode : <any>null;
        data["message"] = this.message !== undefined ? this.message : <any>null;
        data["status"] = this.status !== undefined ? this.status : <any>null;
        data["error"] = this.error !== undefined ? this.error : <any>null;
        data["errors"] = this.errors !== undefined ? this.errors : <any>null;
        data["timestamp"] = this.timestamp !== undefined ? this.timestamp : <any>null;
        data["path"] = this.path !== undefined ? this.path : <any>null;
        return data; 
    }
}

export interface IApiException {
    statusCode?: string | null;
    message?: string | null;
    status?: string | null;
    error?: string | null;
    errors?: any | null;
    timestamp?: string | null;
    path?: string | null;
}

export class LoginVm implements ILoginVm {
    username!: string;
    password!: string;

    constructor(data?: ILoginVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.username = data["username"] !== undefined ? data["username"] : <any>null;
            this.password = data["password"] !== undefined ? data["password"] : <any>null;
        }
    }

    static fromJS(data: any): LoginVm {
        data = typeof data === 'object' ? data : {};
        let result = new LoginVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username !== undefined ? this.username : <any>null;
        data["password"] = this.password !== undefined ? this.password : <any>null;
        return data; 
    }
}

export interface ILoginVm {
    username: string;
    password: string;
}

export class TodoParams implements ITodoParams {
    content!: string;
    level?: TodoParamsLevel | null;

    constructor(data?: ITodoParams) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.content = data["content"] !== undefined ? data["content"] : <any>null;
            this.level = data["level"] !== undefined ? data["level"] : <any>null;
        }
    }

    static fromJS(data: any): TodoParams {
        data = typeof data === 'object' ? data : {};
        let result = new TodoParams();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["content"] = this.content !== undefined ? this.content : <any>null;
        data["level"] = this.level !== undefined ? this.level : <any>null;
        return data; 
    }
}

export interface ITodoParams {
    content: string;
    level?: TodoParamsLevel | null;
}

export class TodoVm implements ITodoVm {
    createdAt?: Date | null;
    updatedAt?: Date | null;
    id?: string | null;
    content!: string;
    level!: TodoVmLevel;
    isCompleted!: boolean;

    constructor(data?: ITodoVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.createdAt = data["createdAt"] ? new Date(data["createdAt"].toString()) : <any>null;
            this.updatedAt = data["updatedAt"] ? new Date(data["updatedAt"].toString()) : <any>null;
            this.id = data["id"] !== undefined ? data["id"] : <any>null;
            this.content = data["content"] !== undefined ? data["content"] : <any>null;
            this.level = data["level"] !== undefined ? data["level"] : <any>null;
            this.isCompleted = data["isCompleted"] !== undefined ? data["isCompleted"] : <any>null;
        }
    }

    static fromJS(data: any): TodoVm {
        data = typeof data === 'object' ? data : {};
        let result = new TodoVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>null;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>null;
        data["id"] = this.id !== undefined ? this.id : <any>null;
        data["content"] = this.content !== undefined ? this.content : <any>null;
        data["level"] = this.level !== undefined ? this.level : <any>null;
        data["isCompleted"] = this.isCompleted !== undefined ? this.isCompleted : <any>null;
        return data; 
    }
}

export interface ITodoVm {
    createdAt?: Date | null;
    updatedAt?: Date | null;
    id?: string | null;
    content: string;
    level: TodoVmLevel;
    isCompleted: boolean;
}

export enum UserVmRole {
    Admin = "Admin", 
    User = "User", 
}

export enum TodoParamsLevel {
    Low = "Low", 
    Normal = "Normal", 
    High = "High", 
}

export enum TodoVmLevel {
    Low = "Low", 
    Normal = "Normal", 
    High = "High", 
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = event => { 
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob); 
        }
    });
}
