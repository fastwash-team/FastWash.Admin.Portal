import { ApplicationUserDTO, ProfilesApi } from "@/services/fastwash-client";
import { fastWashCookies } from "@/utils/libs";
import { useQuery } from "@tanstack/react-query";

const Cookies = fastWashCookies();

export type ApiResponse = {
  responseObject: ApplicationUserDTO
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const QUERY_KEY_GET_PROFILE_DETAILS = "Get Profile Details";

export const useGetProfileDetails = () => {
  const profileApi = new ProfilesApi();

  return useQuery({
    queryKey: [QUERY_KEY_GET_PROFILE_DETAILS],
    queryFn: async () => {
      const res = await profileApi.apiProfilesProfileExternalGet({
        headers: { Authorization: `Bearer ${Cookies.get("tk")}` },
      });
      return res?.data as ApiResponse;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
