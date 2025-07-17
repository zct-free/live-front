declare module "js-cookie" {
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    [property: string]: any;
  }

  interface CookiesStatic {
    get(name: string): string | undefined;
    set(name: string, value: string, options?: CookieAttributes): string | undefined;
    remove(name: string, options?: CookieAttributes): void;
    getJSON(name: string): any;
    getJSON(): any;
    withAttributes(attributes: CookieAttributes): CookiesStatic;
    defaults: CookieAttributes;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
