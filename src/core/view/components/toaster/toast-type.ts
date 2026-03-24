
export interface ToastParams {
	tittle: string;
	description?: string;
	action?: {
		label: string;
		onClick: VoidFunction;
	};
	cancel?: string;
	duration?: number;
	position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
}
