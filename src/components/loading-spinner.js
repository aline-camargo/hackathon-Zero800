const loadingSpinner = () => {
    const template = `
    <div class="spinner-border text-success size-spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `;
    return template;
};

export default loadingSpinner;