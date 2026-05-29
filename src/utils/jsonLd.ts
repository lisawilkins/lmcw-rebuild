import {
  EMAIL,
  LINKEDIN_URL,
  PERSON_DESCRIPTION,
  PERSON_JOB_TITLE,
  SITE_NAME,
  SITE_URL,
} from '../data/site';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: PERSON_JOB_TITLE,
    description: PERSON_DESCRIPTION,
    email: EMAIL,
    sameAs: [LINKEDIN_URL],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    author: { '@id': PERSON_ID },
  };
}

export function profilePageNode(pageUrl: string, pageName: string) {
  return {
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name: pageName,
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export interface CreativeWorkParams {
  name: string;
  description: string;
  url: string;
  image?: string;
  about?: string;
}

export function creativeWorkNode({
  name,
  description,
  url,
  image,
  about,
}: CreativeWorkParams) {
  const node: Record<string, unknown> = {
    '@type': 'CreativeWork',
    '@id': `${url}#creativework`,
    name,
    description,
    url,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };

  if (image) {
    node.image = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  }

  if (about) {
    node.about = { '@type': 'Organization', name: about };
  }

  return node;
}

export function buildJsonLdGraph(extraNodes: Record<string, unknown>[] = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personNode(), websiteNode(), ...extraNodes],
  };
}
