import client from "./config";
import {CommunityInfo} from "../routes/Community";

// USER
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

export const claimDailyPackages = async(userId: number) => {
  try {
    const response = await client.put(`/users/${userId}/packages/daily-package`)
    return {data: response.data, statusCode: response.status}
  } catch (error: any) {
    console.error(
        "Request failed, response:",
        error
    )
    return {data: null, statusCode: error.statusCode}
  }
}

// STICKERS
export const fetchAllStickers = async () => {
  try {
    const {data: stickers} = await client.get(`/stickers`);
    return stickers.items
  } catch (error: any) {
    console.error(
      "Request failed, response:",
      error
    );
    return []
  }
}

// EXCHANGES
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

// COMMUNITIES
export const fetchCommunities = async (ownerId?: number, memberId?: number, name?: string) => {
  const _params = {
    owner: ownerId || undefined,
    member: memberId || undefined,
    name: name || undefined
  }

  let fetchedCommunities: any = []
  try {
    const response = await client.get(`/communities`, {params: _params})
    fetchedCommunities = response.data.items
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }

  return fetchedCommunities
}

export const updateCommunity = async (community_id: string, user_id: any, form: any): Promise<CommunityInfo | undefined> =>  {
  let updatedCommunity = undefined;
  try {
    const response = await client.put(`/communities/${community_id}`, form, {headers: {
        'x-user-id': user_id
      }})
    updatedCommunity = response.data
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }

  return updatedCommunity
}
