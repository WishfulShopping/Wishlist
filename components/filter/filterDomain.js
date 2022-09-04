
// Define a custom filter filter function!
export default function filterDomain(rows, id, filterValue) {
    return rows.filter(row => {
      return [row.original.logo, row.original.image, row.original.url].some(item=>(new RegExp( '\\b' + filterValue.join('\\b|\\b') + '\\b') ).test(item))
    })
  }
  