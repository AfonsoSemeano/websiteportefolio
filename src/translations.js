function getComponentTranslation(type, onLoad) {
    let req = new XMLHttpRequest();
    req.responseType = "json";
    req.onload = function() {
        onLoad(this.response);
    }
    req.open("GET", `/translation/${type}`);
    req.send();
}

function getAllTranslations(onLoad) {
    let req = new XMLHttpRequest();
    req.responseType = "json";
    req.onload = function() {
        onLoad(this.response);
    }
    req.open("GET", `/translations`);
    req.send();
}

const translationState = {
    'navbar': {
      'home': '',
      'aboutme': '',
      'myprojects': '',
      'portefoliowebsite': '',
      'login': '',
      'register': '',
      'language': '',
    },
    'jumbotron': {
      'welcome': '',
      'aboutme': '',
      'myprojects': '',
      'createaccount': '',
      'meetmeone': '',
      'meetmetwo': '',
    },
    'aboutme': {
      "aboutme": '',
      "pone": '',
      "ptwo": '',
      "languages": '',
      "courses": '',
      "courseone": '',
      "coursetwo": '',
    }
  };

exports.getComponentTranslation = getComponentTranslation;
exports.getAllTranslations = getAllTranslations;
exports.translationState = translationState;
