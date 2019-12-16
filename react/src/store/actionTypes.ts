import { inferStringLiteral } from "../types/infer-types"

// SOCKET ACTIONS
export const SOCKET_CONNECT = inferStringLiteral('SOCKET_CONNECT');
export const SOCKET_CONNECTED = inferStringLiteral('SOCKET_CONNECTED');
// SNACKBAR ACTIONS
export const SHOW_SNACKBAR = inferStringLiteral('SHOW_SNACKBAR');
export const HIDE_SNACKBAR = inferStringLiteral('HIDE_SNACKBAR');