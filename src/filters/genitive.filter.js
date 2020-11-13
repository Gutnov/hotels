export default function(val, words) {
	let res = words.many2;

	if(val % 100 < 5 || val % 100 > 20 ) {
		if (val % 10 == 1) res = words.singular;
		if(val % 10 > 1 && val % 10 < 5) res = words.many1
	}
	return res
}
