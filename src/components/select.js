const Select = (func) => {
  const template = `
  <div class="input-group my-3 mx-2 select">
    <div class="input-group-prepend">
      <label class="input-group-text green-border" for="GroupSelect">Região</label>
    </div>
    <select class="custom-select green-border" id="GroupSelect" onChange="select.handleClick(event,${func})">
      <option selected>Escolha...</option>
      <option value="Centro">Centro</option>
      <option value="Zona-Sul">Zona Sul</option>
      <option value="Zona-Norte">Zona Norte</option>
      <option value="Zona-Leste">Zona Leste</option>
      <option value="Zona-Oeste">Zona Oeste</option>
    </select>
</div>
  `;
  return template;
};

window.select = {
  handleClick: (event, callBack) => {
    const path = `Regiao-${event.target.options[event.target.selectedIndex].value}`;
    callBack(path);
  },
};

export default Select;
