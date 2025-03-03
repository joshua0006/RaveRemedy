/**
 * SEO Component
 * 
 * Handles page meta tags for SEO optimization using react-helmet-async.
 * 
 * @component
 * @example
 * ```tsx
 * <SEO 
 *   title="About Us"
 *   description="Learn about RaveRemedy's mission and values"
 * />
 * ```
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description,
  image = 'https://raveremedy.com/01.png'
}) => {
  const fullTitle = `${title} | RaveRemedy`;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};