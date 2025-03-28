row = document.body.innerHTML.split(/\r?\n/) ;

html  = '<table>';
html += '<tr><th>' + row[0].replaceAll(/\t/g , '</th><th>' ) + '</th></tr>' ;
for( i = 1 ; i < row.length ; i++ )
{
	if ( row[i] == '' ) break;
	html += '<tr><td>' + row[i].replaceAll(/\t/g , '</td><td>' ) + '</td></tr>' ;
}
html += '</table>';


document.body.innerHTML = html ;

document.head.insertAdjacentHTML( 'beforeend', '<link rel="stylesheet" href="tsv.css"/>' );


// Table sorting :
// source : https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
	v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
	)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
	const table = th.closest('table');
	Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
		.sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
		.forEach(tr => table.appendChild(tr) );
})));

