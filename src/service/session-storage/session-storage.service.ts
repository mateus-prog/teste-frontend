import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  /**
   * Session storage saves data and clears it when the user closes the tab
   */
  constructor() { }

  /**
   * Gets a cached object if it exists and has not expired OR generate it with a generator function
   * @param generator A function that generates the string to be saved
   * @param key The key that identifies the string to your application
   * @param expirationHours How many hours does the string stays in cache before being removed, zero to always remove
   */
  async generateOrCache(generator: () => string | Promise<string>, key: string, expirationHours = 24) {
    const savedData = this.getItem(key);
    if (savedData && expirationHours > 0) {
      return savedData;
    }
    let newData = generator();
    if (newData instanceof Promise) {
      newData = await newData;
    }
    if (typeof newData !== 'string') {
      throw new Error('Generator function must return a string to be saved internally, got ' + typeof newData);
    }
    if (expirationHours <= 0) {
      this.clearItem(key);
    } else {
      this.setItem(key, newData, expirationHours);
    }
    return newData;
  }

  /**
   * Same as generateOrCache, but doesn't allow promises in the generator function and therefore is syncronous
   * @param generator A function that generates the string to be saved
   * @param key The key that identifies the string to your application
   * @param expirationHours How many hours does the string stays in cache before being removed
   */
  generateOrCacheSync(generator: () => string, key: string, expirationHours = 24) {
    const savedData = this.getItem(key);
    if (savedData) {
      return savedData;
    }
    const newData = generator();
    if (typeof newData !== 'string') {
      throw new Error('Generator function must return a string to be saved internally, got ' + typeof newData);
    }
    this.setItem(key, newData, expirationHours);
    return newData;
  }

  /**
   * Retrieves a locally stored item by its key (or null if it doesn't exist)
   * unless it has expired (in which case it deletes it and returns null)
   * @param key The unique identifier of the cached item
   */
  getItem(key: string): string {
    const data = window.sessionStorage.getItem(key);
    if (data === null || data === undefined) {
      return String(null);
    }
    const expirationDateStr = window.sessionStorage.getItem(key + '-expdate');
    if (typeof expirationDateStr !== 'string') {
      return data;
    }
    const expirationDateTime = parseInt(expirationDateStr, 10);
    if (isNaN(expirationDateTime)) {
      return String(null);
    }
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setTime(expirationDateTime);
    if (expirationDate < now) {
      window.sessionStorage.removeItem(key);
      window.sessionStorage.removeItem(key + '-expdate');
      return String(null);
    }
    return data;
  }

  /**
   * Saves data to sessionStorage optionally giving it an expiration date in terms of hours before invalidation.
   * @param key The unique identifier of the cached item
   * @param data The data, in a string, containing the information to be saved
   * @param expirationHours How many hours before invalidating the cache (null for never), default 24 hours
   */
  setItem(key: string, data: string, expirationHours: number | void = 24): void {
    if (expirationHours === null || expirationHours === undefined) {
      window.sessionStorage.setItem(key, data);
      return;
    }
    if (!expirationHours || isNaN(expirationHours) || expirationHours <= 0) {
      window.sessionStorage.removeItem(key);
      return;
    }
    const d = new Date();
    d.setTime(d.getTime() + expirationHours * 1000 * 60 * 60);
    const timeString = d.getTime().toString();
    window.sessionStorage.setItem(key + '-expdate', timeString);
    window.sessionStorage.setItem(key, data);
  }

  /**
   * @param key The unique identifier of the cached item
   * @param data The data, in a string, containing the information to be saved
   * @param expiration The expiration date object, UNIX timestamp or date string of when the cached item will dissapear
   * If the expiration is a number, it is the UNIX timestamp in UTC timezone of milliseconds since 01/01/1970
   * If the expiration is a string, it should be interpretable as `new Date(expiration)`, otherwise this function will throw
   */
  setItemWithExpiration(key: string, data: string, expiration: number | string | Date) {
    if (expiration instanceof Date) {
      if (isNaN(expiration.getTime())) {
        throw new Error("Date instance is invalid");
      }
      expiration = expiration.getTime();
    } else if (typeof expiration === "string") {
      const date = new Date(expiration);
      if (isNaN(date.getTime())) {
        throw new Error(`Date instance interpreted from "${expiration}" is invalid`);
      }
      expiration = date.getTime();
    } else if (typeof expiration === "number" && expiration < 1591809813796) {
      // Use clearItem if you want to clear a item.
      throw new Error("Expiration number is too small");
    } else if (typeof expiration !== "number") {
      throw new Error("Unhandled expiration parameter");
    }
    window.sessionStorage.setItem(key + '-expdate', expiration.toString());
    window.sessionStorage.setItem(key, data);
  }

  /**
   * Removes an item from cache, clearing its expiration date if it exists
   * @param key The unique identifier of the cached item
   */
  removeItem(key: string) {
    window.sessionStorage.removeItem(key + '-expdate');
    return window.sessionStorage.removeItem(key);
  }

  /**
   * Alias for removeItem
   * @param key The unique identifier of the cached item
   */
  clearItem(key: string) {
    return this.removeItem(key);
  }
}
