const authorizedEmailIDs = ["onkardeshpande07@gmail.com"];

export const isAuthorized = (email: string): boolean =>
  authorizedEmailIDs.includes(email);
