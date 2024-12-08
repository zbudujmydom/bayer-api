export const isOfferValid = (id: string): boolean => {
  const availableIds = ["111", "222", "333"];

  return availableIds.includes(id);
};
