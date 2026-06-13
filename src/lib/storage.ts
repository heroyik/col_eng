export function hasLocalStorage(): boolean {
  if (typeof localStorage === "undefined") return false;

  try {
    const testKey = "__col_eng_storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getStorageItem(key: string): string | null {
  if (!hasLocalStorage()) return null;

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string): void {
  if (!hasLocalStorage()) return;

  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked in Safari private or embedded browser contexts.
  }
}

export function removeStorageItem(key: string): void {
  if (!hasLocalStorage()) return;

  try {
    localStorage.removeItem(key);
  } catch {
    // Storage can be blocked in Safari private or embedded browser contexts.
  }
}
