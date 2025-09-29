import { User } from "types";

const ADMIN_KEY = "admin";
const TOKEN_KEY = "token";

//Lưu admin vào localStorage
export function saveAdminToLocalStorage(user:User): void {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
}

//Lấy admin từ localStorage
export function getAdminFromLocalStorage():User | null {
    const adminString = localStorage.getItem(ADMIN_KEY);
    if(!adminString){
        return null;
    }
    try{
        const admin:User = JSON.parse(adminString);
        return admin;
    }catch(err){
        return null;
    }
}

// Xóa user khỏi localStorage
export function removeAdminFromLocalStorage(): void {
  localStorage.removeItem(ADMIN_KEY);
}

// Lưu token người dùng
export function saveTokenToLocalStorage(token:string):void {
    localStorage.setItem(TOKEN_KEY, token);
}

// Lấy token người dùng
export function getTokenFromLocalStorage():string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
        return token;
    }
    return null;
}

// Xóa token người dùng
export function removeTokenFromLocalStorage():void {
    localStorage.removeItem(TOKEN_KEY);
}