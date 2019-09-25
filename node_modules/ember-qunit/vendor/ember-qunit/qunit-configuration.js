/* globals QUnit */

(function() {
  QUnit.config.autostart = false;
  QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container' });
  QUnit.config.urlConfig.push({ id: 'nolint', label: 'Disable Linting' });
  QUnit.config.urlConfig.push({ id: 'dockcontainer', label: 'Dock container' });
  QUnit.config.urlConfig.push({ id: 'devmode', label: 'Development mode' });

  QUnit.config.testTimeout = QUnit.urlParams.devmode ? null : 60000; //Default Test Timeout 60 Seconds
})();
