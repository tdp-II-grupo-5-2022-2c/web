import client from "./config";

export const fetchUserStickers = async (userId: number, searchFilters:any) => {
  try {
    const {data: stickers} = await client.get(`/users/${userId}/stickers`, {
      params: searchFilters
    });
    return stickers

  } catch (error: any) {
    console.error(
      "Request failed, response:",
      error
    );
    return []
  }
}

export const fetchAllStickers = async () => {
  try {
    const {data: stickers} = await client.get(`/stickers`);
    return stickers
  } catch (error: any) {
    console.error(
      "Request failed, response:",
      error
    );
    return []
  }
}


