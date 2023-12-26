import { ToastEnum } from '../utils/TToast.enum';

interface ToastAction{
  callback:Function,
  text:string,
  closeOnClick?:boolean
}
interface Toast {
    message: string;
    type: ToastEnum;
    show: boolean;
    action:ToastAction|{}
    [key:string|number]:any
}
export const useToast = (key='--toast--') => {
  const initialValues={ show: false, message: '', type: ToastEnum.info,action:{} }
  const toastRef = useState<Toast>(key, () => (initialValues));
  const close=() => {
      toastRef.value =  { ...toastRef.value, show: false }
  }

  let timeout:any;
  const showToast = ({ message, type = ToastEnum.info,duration,...extraConfig }: { message: string, type:  ToastEnum,action?:ToastAction,duration?:number,[key:string|number]:any }) => {
      toastRef.value = { message, type, ...extraConfig ,show: true };
      if(timeout!=undefined){
          clearTimeout(timeout)
      }
       timeout=setTimeout(()=>{
          close();
      },duration||3000)
  }
  return { showToast, toastRef, close };
}
