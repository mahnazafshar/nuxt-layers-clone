import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
export const useScreen=()=>{

const breakpoints = useBreakpoints(breakpointsTailwind)

const smAndLarger = breakpoints.greaterOrEqual('sm')
const largerThanSm = breakpoints.greater('sm')
const lgAndSmaller = breakpoints.smallerOrEqual('lg')
const smallerThanLg = breakpoints.smaller('lg')

return {smAndLarger,largerThanSm,lgAndSmaller,smallerThanLg}
}
