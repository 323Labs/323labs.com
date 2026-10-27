(() => {
  const root = document.getElementById('converter');
  if (!root) return;
  const find = id => root.querySelector('#' + id);
  const fields = ['tx', 'rx', 'bad'];
  const inputs = Object.fromEntries(fields.map(key => [key, find(key + '-percent')]));
  const windowInput = find('window-seconds');
  const format = value => value.toLocaleString('en-US', { maximumFractionDigits: 3 });
  function render() {
    const values = Object.fromEntries(fields.map(key => [key, Number(inputs[key].value)]));
    const total = fields.reduce((sum, key) => sum + values[key], 0);
    const seconds = Number(windowInput.value);
    for (const key of fields) {
      inputs[key].max = Math.max(0, 100 - total + values[key]).toFixed(1);
      inputs[key].setAttribute('aria-valuetext', values[key].toFixed(1) + ' percent');
      find(key + '-label').textContent = values[key].toFixed(1) + '%';
      find(key + '-bar').style.width = values[key] + '%';
    }
    const tx = values.tx * seconds / 100;
    const rx = values.rx * seconds / 100;
    find('idle-label').textContent = 'Idle: ' + Math.max(0, 100 - total).toFixed(1) + '%';
    find('mc-tx').textContent = format(tx) + ' s';
    find('mc-rx').textContent = format(rx) + ' s';
    find('mc-total').textContent = (values.tx + values.rx).toFixed(1) + '%';
    find('omitted').textContent = format(values.bad * seconds / 100) + ' s';
    find('mt-tx').textContent = seconds === 3600 ? '≈ ' + values.tx.toFixed(1) + '%' : 'Cannot derive the last hour from this window';
    find('mt-tx').classList.toggle('unavailable', seconds !== 3600);
    find('mt-channel').textContent = seconds === 60 ? '≈ ' + total.toFixed(1) + '%' : 'Cannot derive the last minute from this window';
    find('mt-channel').classList.toggle('unavailable', seconds !== 60);
    find('calc-equation').textContent = 'TX: ' + values.tx.toFixed(1) + '% × ' + format(seconds) + ' s / 100 = ' + format(tx) + ' s';
    find('calc-context').textContent = seconds === 60
      ? 'Channel comparison: Meshtastic includes the hypothetical failed RX; MeshCore TX + RX omits it. One minute of traffic cannot determine the last hour’s TX percentage.'
      : seconds === 3600
        ? 'The TX comparison matches the one-hour denominator. A one-hour average does not reveal activity in the last minute.'
        : 'This is a 24-hour average. It equals a since-boot average only if the interval starts at boot and uptime is 24 hours. Neither recent Meshtastic percentage can be recovered from it.';
  }
  fields.forEach(key => inputs[key].addEventListener('input', render));
  windowInput.addEventListener('change', render);
  find('reset-converter').addEventListener('click', () => {
    fields.forEach(key => { inputs[key].max = '100'; });
    inputs.tx.value = '1'; inputs.rx.value = '4'; inputs.bad.value = '1';
    windowInput.value = '3600';
    render();
  });
  render();
})();
