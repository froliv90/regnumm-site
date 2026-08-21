module.exports = {
  eleventyComputed: {
    schema: (data) => {
      const ld = data.ld;
      const url = ld.URL + "/fundamentacao/";

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ScholarlyArticle",
            "@id": url + "#artigo",
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            headline: "Fundamentação teórica dos quatro perfis de comportamento financeiro",
            description: data.seoDescricao,
            inLanguage: "pt-BR",
            author: ld.refPessoa,
            publisher: ld.refNegocio,
            datePublished: "2026-08-12",
            dateModified: "2026-08-12",
            image: ld.URL + "/og-image.png",
            about: [
              { "@type": "Thing", name: "Economia comportamental" },
              { "@type": "Thing", name: "Desconto temporal" },
              { "@type": "Thing", name: "Aversão à perda" },
              { "@type": "Thing", name: "Comportamento financeiro" }
            ],
            citation: [
              {
                "@type": "ScholarlyArticle",
                name: "Prospect Theory: An Analysis of Decision under Risk",
                author: [
                  { "@type": "Person", name: "Daniel Kahneman" },
                  { "@type": "Person", name: "Amos Tversky" }
                ],
                datePublished: "1979",
                isPartOf: { "@type": "Periodical", name: "Econometrica" },
                pagination: "263-291"
              },
              {
                "@type": "ScholarlyArticle",
                name: "Navigating Time-Inconsistent Behavior: The Influence of Financial Knowledge, Behavior, and Attitude on Hyperbolic Discounting",
                datePublished: "2024",
                isPartOf: { "@type": "Periodical", name: "Behavioral Sciences" }
              },
              {
                "@type": "Book",
                name: "Behavioral Finance and Wealth Management: How to Build Optimal Portfolios That Account for Investor Biases",
                author: { "@type": "Person", name: "Michael M. Pompian" },
                datePublished: "2006",
                publisher: { "@type": "Organization", name: "John Wiley & Sons" }
              }
            ]
          },
          ld.pessoa,
          ld.negocio,
          ld.trilha([["Regnumm", "/"], ["Fundamentação", null]])
        ]
      });
    }
  }
};
