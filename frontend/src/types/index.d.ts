export {};

declare global {
	interface Window {
		ethereum: any; // 👈️ turn off type checking
	}
}
