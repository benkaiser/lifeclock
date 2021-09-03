function createRow(weeksAlive) {
  const row = document.createElement('div');
  row.classList.add('row');
  for(let x = 0; x < 52; x++) {
    row.appendChild(createDiv(weeksAlive > x));
  }
  return row;
}

function createDiv(isAlive) {
  const div = document.createElement('div');
  if (isAlive) {
    div.classList.add('alive');
  }
  return div;
}

function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

function yearsBetween(d1, d2) {
  return Math.round((d2 - d1) / (365 * 24 * 60 * 60 * 1000));
}

function renderCells(years, dateOfBirth) {
  const container = document.getElementById('container');
  let weeksAlive = weeksBetween(dateOfBirth, new Date());
  let fractionAlive = yearsBetween(dateOfBirth, new Date()) / years;
  console.log(fractionAlive);
  setPositionOfMessage(fractionAlive);
  container.innerHTML = '';
  for (let x = 0; x < years; x++) {
    container.appendChild(createRow(weeksAlive));
    weeksAlive -= 52;
  }
}

function setPositionOfMessage(fractionAlive) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.style.height = fractionAlive * 100 + '%';
  messageContainer.classList.add('visible');
}

function setTheme(themeNameOrColor, useCustomColor) {
  var root = document.querySelector(':root');
  if (useCustomColor) {
    root.style.setProperty('--theme-1', themeNameOrColor);
    root.style.setProperty('--theme-2', themeNameOrColor);
  } else {
    if (themeNameOrColor === 'random') {
      const themeNamesWithoutRandom = Object.keys(themes).filter(name => name !== 'random');
      themeNameOrColor = themeNamesWithoutRandom[Math.floor(Math.random() * themeNamesWithoutRandom.length)];
    }
    const color = themes[themeNameOrColor];
    root.style.setProperty('--theme-1', color.start);
    root.style.setProperty('--theme-2', color.end);
  }
}

function setTitle(title) {
  document.getElementById('message').innerHTML = title.replace(/\n/g, '<br>');
}

document.querySelector('#openOptions').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

chrome.storage.sync.get({
  title: 'MAKE THIS\nWEEK COUNT',
  theme: 'random',
  lifeExpectancy: 85,
  dateOfBirth: '1996-05-26',
  useCustomColor: false
}, function(items) {
  setTheme(items.theme, items.useCustomColor);
  setTitle(items.title);
  renderCells(items.lifeExpectancy, new Date(items.dateOfBirth));
});

