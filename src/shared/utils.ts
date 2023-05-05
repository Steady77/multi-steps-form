export async function fetchData<T>(url: string): Promise<T> {
	const response = await fetch(url);
	const body = await response.json();

	return body;
}

export const getKeys = <T extends object>(obj: T) =>
	Object.keys(obj) as Array<keyof T>;
