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

export const fetchCommunityExchanges = async (userId: number, communityId:string) => {
  try {
    const {data: exchanges} = await client.get(`/users/${userId}/communities/${communityId}/exchanges`);
    return exchanges

  } catch (error: any) {
    console.error(
      "Request failed, response:",
      error
    );
    return []
  }
}

const fetchCommunities = async (ownerId?: number, memberId?: number) => {
  try {
    const {data: communities} = await client.get(`/communities`)
    return communities
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
  return []
}


