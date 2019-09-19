import * as prism from '../lib/prism';

export function highlight(code, lang) {
	if (prism.languages[lang]!=null) {
		return Promise.resolve(prism.highlight(code, prism.languages[lang], lang));
	}
	return Promise.reject(Error());
}
