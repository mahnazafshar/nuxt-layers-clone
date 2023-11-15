import { ToastEnum } from '../utils/TToast.enum';
interface Toast {
    message: string;
    type: ToastEnum;
    show: boolean;
    [key:string|number]:any
}
export const useToast = (key='--toast--') => {
  const toastRef = useState<Toast>(key, () => ({ show: false, message: '', type: ToastEnum.info }));
  const close=() => {
      toastRef.value = { ...toastRef.value, show: false }
  }

  let timeout:any;
  const showToast = ({ message, type = ToastEnum.info,duration,...extraConfig }: { message: string, type:  ToastEnum,duration?:number,[key:string|number]:any }) => {
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
