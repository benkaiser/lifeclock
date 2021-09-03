function setup() {
  const themeOptions = document.getElementById('theme');
  Object.keys(themes).forEach(themeKey => {
    const theme = themes[themeKey];
    const option = document.createElement('option');
    option.value = themeKey;
    option.innerHTML = theme.name;
    themeOptions.appendChild(option);
  });
}
setup();

function save_options() {
  var title = document.getElementById('title').value;
  var theme = document.getElementById('theme').value;
  var lifeExpectancy = document.getElementById('lifeExpectancy').value;
  var dateOfBirth = document.getElementById('dateOfBirth').value;
  chrome.storage.sync.set({
    title: title,
    theme: theme,
    lifeExpectancy: lifeExpectancy,
    dateOfBirth: dateOfBirth
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    title: 'MAKE THIS\nWEEK COUNT',
    theme: 'random',
    lifeExpectancy: 85,
    dateOfBirth: '1996-05-26'
  }, function(items) {
    document.getElementById('title').value = items.title;
    document.getElementById('theme').value = items.theme;
    document.getElementById('lifeExpectancy').value = items.lifeExpectancy;
    document.getElementById('dateOfBirth').value = items.dateOfBirth;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);