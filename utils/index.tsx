export const generateId = (id1: any, id2: any) => {
  if (id1 > id2) {
    return id1 + id2;
  } else {
    return id2 + id1;
  }
};

export const getMatchedUserInfo = (users: any, userLoggedId: any) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedId];

  const [id, user]: any = Object.entries(newUsers).flat();

  return { id, ...user };
};
