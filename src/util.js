//Helper function that will sort a list of data

/*(a , b) are basically different items that's being grabbed
    Once grabbed, it will then compare each other and placed them accordingly
 */
export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;

  {
    /*
    Simplified into one line

    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))

*/
  }
};
