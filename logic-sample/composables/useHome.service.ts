import { useFetchApi } from "./api/useFetchApi";

export const useHomeService = () => {
  const fetchData = useFetchApi();
  return () =>
      fetchData("/v10/site/index", {
          method: "get",
      }, { ignoreErrors: true }).then((response: any) => {
         console.log("response",response)
          return response
      });
}
