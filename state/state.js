import { proxy } from "valtio";

const state = proxy({
        uid: "",
        firstName: '',
        lastName: '',
        userName: '',
        role:'',
        email: '',
        phone: '',
        location: '',
        logs: {},
  });
  
  export { state };