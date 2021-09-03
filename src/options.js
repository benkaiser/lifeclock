var useCustomColor = false;

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

function setTheme(themeNameOrColor) {
  var root = document.querySelector(':root');
  if (useCustomColor) {
    root.style.setProperty('--theme-1', themeNameOrColor);
    root.style.setProperty('--theme-2', themeNameOrColor);
  } else {
    const color = themes[themeNameOrColor];
    root.style.setProperty('--theme-1', color.start);
    root.style.setProperty('--theme-2', color.end);
  }
}

function save_options() {
  var title = document.getElementById('title').value;
  var theme = useCustomColor ? document.getElementById('customColor').value : document.getElementById('theme').value;
  var lifeExpectancy = document.getElementById('lifeExpectancy').value;
  var dateOfBirth = document.getElementById('dateOfBirth').value;
  chrome.storage.sync.set({
    title: title,
    theme: theme,
    lifeExpectancy: lifeExpectancy,
    dateOfBirth: dateOfBirth,
    useCustomColor: useCustomColor
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
    dateOfBirth: '1996-05-26',
    useCustomColor: false,
  }, function(items) {
    document.getElementById('title').value = items.title;
    document.getElementById('lifeExpectancy').value = items.lifeExpectancy;
    document.getElementById('dateOfBirth').value = items.dateOfBirth;
    if (items.useCustomColor) {
      document.getElementById('customColor').value = items.theme;
    } else {
      document.getElementById('theme').value = items.theme;
    }
    useCustomColor = items.useCustomColor;
    setTheme(items.theme);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

document.getElementById('theme').addEventListener('change', () => {
  useCustomColor = false;
  const theme = document.getElementById('theme').value;
  if (theme === 'random') {
    document.getElementById('themePreview').classList.add('hidden');
  } else {
    setTheme(theme);
    document.getElementById('themePreview').classList.remove('hidden');
  }
});

document.getElementById('customColor').addEventListener('change', () => {
  useCustomColor = true;
  setTheme(document.getElementById('customColor').value);
  document.getElementById('themePreview').classList.remove('hidden');
});