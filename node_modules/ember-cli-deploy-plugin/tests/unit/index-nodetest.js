/* jshint node: true */
/* jshint jasmine: true */
'use strict';
var assert = require('chai').assert;

var stubProject = {
  name: function(){
    return 'my-project';
  }
};

describe('base plugin', function() {
  var Subject, mockUi;

  beforeEach(function() {
    Subject = require('../../index');
    mockUi = {
      verbose: false,
      messages: [],
      write: function() {
      },
      writeLine: function(message) {
        this.messages.push(message);
      },
      logInfoColor: 'blue'
    };
  });

  it('has a name', function() {
    var plugin = new Subject({
      name: 'test-plugin',
    });

    assert.equal(plugin.name, 'test-plugin');
  });

  describe('log', function() {

    it('logs raw', function() {
      var plugin = new Subject({
        name: 'test-plugin',
        ui: mockUi
      });
      plugin.logRaw('foo');
      assert.deepEqual(mockUi.messages, ['foo']);
    });

    it('logs with default blue color', function() {
      var plugin = new Subject({
        name: 'test-plugin',
        ui: mockUi
      });
      plugin.log('foo');
      assert.deepEqual(mockUi.messages, ['\u001b[34m- foo\u001b[39m']);
    });

    it('logs verbose', function() {
      var verboseUi = {
        verbose: true,
        messages: [],
        write: function(message) {
          this.messages.push(message);
        },
        writeLine: function() {
        }
      };
      var plugin = new Subject({
        name: 'test-plugin',
        ui: verboseUi
      });
      plugin.log('foo', {verbose: true});
      assert.deepEqual(verboseUi.messages, ['\u001b[34m|    \u001b[39m']);
    });
  });

  describe('plugin helper', function() {
    it('provides access to the oringal default values', function() {
      var Plugin = Subject.extend({
        defaultConfig: {
          distFiles: ['index.html', 'assets/logo.png'],
          jsonBlueprint: {
            link: {
              selector: 'link',
              attributes: ['rel', 'href']
            },
          },
          git: {
            sha: function() {
              return '1';
            }
          },
          revisionKey: function(context) {
            return context.revisionData.revisionKey;
          }
        }
      });

      var plugin = new Plugin({
        name: 'build'
      });

      var context = {
        revisionData: { revisionKey: '111' },
        config: {
          build: {
            distFiles: function(context, pluginHelper) {
              var arr = pluginHelper.readConfigDefault('distFiles');
              arr.push('index.json');
              return arr;
            },
            jsonBlueprint: function(context, pluginHelper) {
              var blueprint = pluginHelper.readConfigDefault('jsonBlueprint');
              blueprint.link.attributes.push('integrity');

              return blueprint;
            },
            sha: function(context, pluginHelper) {
              var git = pluginHelper.readConfigDefault('git');

              return git.sha() + '2';
            },
            revisionKey: function(context, pluginHelper) {
              return pluginHelper.readConfigDefault('revisionKey') + '222';
            }
          }
        }
      };

      plugin.beforeHook(context);
      assert.deepEqual(plugin.readConfig('distFiles'), ['index.html', 'assets/logo.png', 'index.json']);
      assert.deepEqual(plugin.readConfig('jsonBlueprint').link.attributes, ['rel', 'href', 'integrity']);
      assert.equal(plugin.readConfig('sha'), '12');
      assert.equal(plugin.readConfig('revisionKey'), '111222');
    });

    it('ensures default values do not get mutated', function() {
      var Plugin = Subject.extend({
        defaultConfig: {
          distFiles: ['index.html', 'assets/logo.png'],
          jsonBlueprint: {
            link: {
              selector: 'link',
              attributes: ['rel', 'href']
            }
          }
        }
      });

      var plugin = new Plugin({
        name: 'build'
      });

      var context = {
        config: {
          build: {
            distFiles: function(context, pluginHelper) {
              var arr = pluginHelper.readConfigDefault('distFiles');
              arr.push('index.json');
              return arr;
            },
            jsonBlueprint: function(context, pluginHelper) {
              var blueprint = pluginHelper.readConfigDefault('jsonBlueprint');
              blueprint.link.attributes.push('integrity');

              return blueprint;
            }
          }
        }
      };

      plugin.beforeHook(context);
      plugin.readConfig('distFiles')
      plugin.readConfig('jsonBlueprint')

      assert.deepEqual(plugin.defaultConfig.distFiles, ['index.html', 'assets/logo.png']);
      assert.deepEqual(plugin.defaultConfig.jsonBlueprint.link.attributes, ['rel', 'href']);
    })

    it('provides the ability to read the plugin config', function() {
      var Plugin = Subject.extend({
        defaultConfig: {
          port: function() {
            return 1234;
          },
          host: 'foo.com'
        }
      });

      var plugin = new Plugin({
        name: 'build'
      });

      var context = {
        ui: mockUi,
        config: {
          build: {
            username: 'bar',
            options: function(context, pluginHelper) {
              return {
                port: pluginHelper.readConfig('port'),
                host: pluginHelper.readConfig('host'),
                username: pluginHelper.readConfig('username')
              };
            }
          }
        }
      };

      plugin.beforeHook(context);
      plugin.configure(context);

      assert.deepEqual(plugin.readConfig('options'), { port: 1234, host: 'foo.com', username: 'bar' });
    });

    it('doesn\'t mutate the original plugin config', function() {
      var Plugin = Subject.extend({
        defaultConfig: { }
      });

      var plugin = new Plugin({
        name: 'build'
      });

      var context = {
        ui: mockUi,
        config: {
          build: {
            tags: ['foo'],
            options: function(context, pluginHelper) {
              var tags = pluginHelper.readConfig('tags');
              tags.push('bar');
              return { tags: tags };
            }
          }
        }
      };

      plugin.beforeHook(context);
      plugin.configure(context);

      assert.deepEqual(plugin.readConfig('options'), { tags: ['foo', 'bar']});
    });
  });
});
