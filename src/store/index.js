import create from 'zustand';

export const useWallet = create((set) => ({
	walletAddress: '',
	setWalletAddress: (wallet) => set(() => ({ walletAddress: wallet })),
}));
