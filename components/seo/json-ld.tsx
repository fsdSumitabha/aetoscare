type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders structured data as a native script tag (not next/script: JSON-LD is
 * data, not executable code). "<" is escaped to prevent HTML injection.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
