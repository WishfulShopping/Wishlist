
// Define a custom filter filter function!
export default function filterBetween(rows, id, filterValue) {
    return rows.filter(row => {
      const rowValue = row.values[id];

      if (filterValue) {
        if (filterValue.min && rowValue <= filterValue.min) {
          return false;
        }
        if (filterValue.max && filterValue.max <= rowValue) {
          return false;
        }
      }
      return true;
    })
  }
  