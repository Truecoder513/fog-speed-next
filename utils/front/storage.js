"use client";
export function lsSet() {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem("ageValid", "ageValid");
  }
}
export function lsGet() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("ageValid");
  }
}
export function lsDel() {
  if (typeof window !== "undefined") {
    return window.localStorage.deleteItem("ageValid");
  }
}
