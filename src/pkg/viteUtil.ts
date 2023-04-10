export function publicUrl(url: string): string {
  const baseUrl = import.meta.env.BASE_URL;
  return `${baseUrl}/${url}`.replace(new RegExp("//+/", "g"), "/");
}
