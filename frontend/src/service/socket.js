import {toast} from "react-toastify";
import {io} from "socket.io-client";

export const socket = io();

socket.on("connect", () => {
  toast.success("Connection to the server", {
    position: 'top-right'
  });
});

socket.on("disconnect", () => {
  toast.warning("Disconnecting from the server", {
    position: 'top-right'
  });
});

socket.on("connect_error", (error) => {
  toast.error(`Connection error '${error}'`, {
    position: 'top-right'
  });
});