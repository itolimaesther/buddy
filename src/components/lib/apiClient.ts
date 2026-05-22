import axios from "axios";

// ─── Base Instance ─────────────────────────────────────────────────────────────

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
	timeout: 10_000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// ─── Request Interceptor — attach auth token ──────────────────────────────────

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// ─── Response Interceptor — normalise errors ──────────────────────────────────

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("auth_token");
			window.location.href = "/";
		}
		return Promise.reject(error);
	},
);

export default apiClient;





// import axios from "axios";
// import { useAuthStore } from "../../store";

// // ─── Base Instance ─────────────────────────────────────────────────────────────

// const apiClient = axios.create({
// 	baseURL:
// 		import.meta.env.VITE_API_BASE_URL ?? "https://fe-test.zojapay.com/api",
// 	timeout: 10_000,
// 	headers: {
// 		"Content-Type": "application/json",
// 		Accept: "application/json",
// 	},
// });

// // ─── Request Interceptor ──────────────────────────────────────────────────────
// // Reads the auth token directly from the Zustand store via getState()
// // so we never touch localStorage manually in API code.
// // NOTE: We import the store lazily (inside the interceptor) to avoid
// //       circular-dependency issues at module initialisation time.

// apiClient.interceptors.request.use(
// 	(config) => {
// 		const token = useAuthStore.getState().token as string | null;

// 		// Only attach if the request doesn't already carry its own Authorization
// 		// header (e.g. the OTP calls that pass the registration token explicitly).
// 		if (token && !config.headers["Authorization"]) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}

// 		return config;
// 	},
// 	(error) => Promise.reject(error),
// );

// // ─── Response Interceptor ─────────────────────────────────────────────────────

// apiClient.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response?.status === 401) {
// 			useAuthStore.getState().logout();
// 			window.location.href = "/";
// 		}
// 		return Promise.reject(error);
// 	},
// );

// export default apiClient;

