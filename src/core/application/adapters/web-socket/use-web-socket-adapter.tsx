import { type Socket, io } from "socket.io-client";
import type {
	UseWebSocketAdapterReturn,
	WebsocketConnectAndListenParams,
	WebsocketConnectParams,
	WebsocketListeningEventsParams,
	WebsocketSubscribeParams,
} from "./use-web-socket-adapter-type";

const API_WEBSOCKET = process.env.API_WEBSOCKET;

export function useWebSocketAdapter(): UseWebSocketAdapterReturn {
	function listeningEvents<T>({ socket, eventCallback }: WebsocketListeningEventsParams<T>) {

		socket.onAny((_, payload) => {
			eventCallback(payload);
			disconect(socket);

		});

		socket.on("connect_error", (error) => {
			console.error(`Connection error: ${error.message}`);
			socket.disconnect();
		});

		socket.on("error", (error) => {
			console.error("Socket error:", error);
			socket.disconnect();
		});

	}

	function subscribe({ channelName, socket }: WebsocketSubscribeParams) {
		socket.emit("subscribe", channelName);
	}

	function connect<T>({
		socket,
		channelName,
		subscribe,
		eventCallback,
	}: WebsocketConnectParams<T>) {
		socket.on("connect", () => {
			subscribe({ socket, channelName });
		});

		listeningEvents({ socket, eventCallback });
	}

	function connectAndListen<T>({ eventCallback, channelName }: WebsocketConnectAndListenParams<T>): Socket {
		const socket = io(API_WEBSOCKET, {
			path: "/socket.io",
			// transports: ["websocket", "polling"],
			transports: ["websocket"],

		});

		connect<T>({ socket, channelName, subscribe, eventCallback });

		return socket
	}

	function disconect(socket: Socket) {
		// socket.removeListener("connect");
		socket.disconnect();
	}

	return {
		connectAndListen,
		disconect,
		// socket,
	};
}
