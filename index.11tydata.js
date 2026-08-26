/* Schema da home. Mantém exatamente o mesmo @graph que já estava no
   index.html: Person, ProfessionalService e FAQPage. O FAQ continua sendo
   conteúdo da home, então o FAQPage continua aqui. */
module.exports = {
  eleventyComputed: {
    schema: (data) =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [data.ld.pessoa, data.ld.negocio, data.ld.faqPage]
      })
  }
};
