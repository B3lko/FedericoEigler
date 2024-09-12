let translations = {};
  let supportedLanguages = ['en', 'es'];  // Aquí puedes agregar más idiomas en el futuro
  let currentLanguageIndex = 0;  // Índice del idioma actual

  // Cargar las traducciones desde el archivo JSON
  async function loadTranslations() {
    try {
      const response = await fetch('json/languages.json');
      translations = await response.json();
      changeLanguage(supportedLanguages[currentLanguageIndex]);  // Cargar el primer idioma por defecto
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  // Cambiar el idioma y actualizar el contenido de la página
  function changeLanguage(lang) {
    if (translations[lang]) {
      document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = translations[lang][key];
      });
    }
  }

  // Función para cambiar al siguiente idioma disponible
  function toggleLanguage() {
    currentLanguageIndex = (currentLanguageIndex + 1) % supportedLanguages.length;
    const newLanguage = supportedLanguages[currentLanguageIndex];
    changeLanguage(newLanguage);
  }

  // Iniciar el proceso cuando la página se cargue
  document.addEventListener('DOMContentLoaded', loadTranslations);
