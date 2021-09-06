export const findNames = (searchName, data) => {
  return data
    .sort((a, b) => b.is_favourite - a.is_favourite)
    .filter(
      (name) => name.full_name.toString().toLowerCase().indexOf(searchName) > -1
    );
};

export const usersPerPage = 4;
