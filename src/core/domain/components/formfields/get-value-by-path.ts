// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => {
    if (acc === undefined || acc === null) return undefined;

    const index = Number(part);
    return Number.isNaN(index) ? acc[part] : acc[index];
  }, obj);
}
