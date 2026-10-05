export async function fetcher(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("Request failed.");
    error.status = response.status;
    throw error;
  }

  return response.json();
}
