export const useAbsoluteUrl=()=>{
  const url = useRequestURL();
  const getAbsoluteUrl=(path)=>{
    const baseUrl=url.protocol+'//'+ url.host
    return baseUrl+path
  };
  return {getAbsoluteUrl}
}
