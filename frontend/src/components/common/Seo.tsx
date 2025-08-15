import { useEffect } from 'react';

interface SeoProps {
	title?: string;
	description?: string;
}

const SITE_NAME = 'VIDEO CREW';

export default function Seo({ title, description }: SeoProps) {
	useEffect(() => {
		if (title) {
			document.title = `${title} | ${SITE_NAME}`;
		}

		if (description) {
			let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
			if (!meta) {
				meta = document.createElement('meta');
				meta.setAttribute('name', 'description');
				document.head.appendChild(meta);
			}
			meta.setAttribute('content', description);
		}
	}, [title, description]);

	return null;
}
