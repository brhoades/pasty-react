require('./upload.tag');

riot.mount('rg-alerts', {
  alerts: [{
    type: 'success',
    text: 'test',
    dismissable: false
  }]
});

riot.mount('upload');
