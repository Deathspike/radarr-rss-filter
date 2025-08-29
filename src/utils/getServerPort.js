import http from "node:http";

/** @param {http.Server} server */
export function getServerPort(server) {
  const address = server.address();
  if (typeof address == "string") {
    throw new Error("Invalid address (pipe or domain socket)");
  } else if (!address) {
    throw new Error("Invalid address (not listening)");
  } else {
    return address.port;
  }
}
