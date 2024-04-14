import httpClient from './httpClient';

// Users
export const getUser = async (username: string) => {
  return await httpClient.get(`/users/${username}`);
};

export const getUserByWallet = async (wallet: string) => {
  return await httpClient.get(`/users/wallet/${wallet}`);
};

// Transactions
// ================================ Transactions ================================

export const getTransactions = async (wallet: string) => {
  return await httpClient.get(`/transactions/${wallet}`);
};
