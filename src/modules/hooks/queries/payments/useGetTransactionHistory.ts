import {
  InternalTransactionHistoryDTOPaginatedList,
  TransactionHistoriesApi,
} from "@/services/fastwash-client";
import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";

export type ApiResponse = {
  responseObject: InternalTransactionHistoryDTOPaginatedList;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const QUERY_KEY_GET_TRANSACTION_HISTORY = "Get Transaction History";

export const useGetTransactionHistory = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const swaggerApiParams = useSwaggerApiParams();
  const transactionHistoryApi = new TransactionHistoriesApi(
    ...swaggerApiParams
  );

  return useQuery({
    queryKey: [QUERY_KEY_GET_TRANSACTION_HISTORY, pageIndex, pageSize],
    queryFn: async () => {
      const res = await transactionHistoryApi.apiTransactionHistoriesGet(
        pageIndex,
        pageSize
      );
      return res?.data as ApiResponse;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
