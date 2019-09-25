/* jshint node: true */

var fs = require('fs-extra');
var run = require('./run');
var stat = fs.stat;
var copy = fs.copy;

function supportsWorktree() {
  return run('git', ['help', 'worktree']).then(function() {
    return true;
  }, function() {
    return false;
  });
}

function currentRevision() {
  return run('git', ['rev-parse', '--short', 'HEAD']).then(function(output) {
    return output.stdout;
  });
}

function prepareTree(targetDir, myRepo, repo, branch) {
  return stat(targetDir).then(function() {
    return run('git', ['reset', '--hard'], {cwd: targetDir}).then(function(){
      return run("git", ["pull"], {cwd: targetDir});
    });
  }, function(err){
    if (err.code !== 'ENOENT') { throw err; }
    return supportsWorktree().then(function(useWorktree) {
      if (useWorktree && myRepo === repo) {
        return run("git", ["worktree", "prune"]).then(function() {
          return run("git", ["worktree", "add", targetDir, branch]);
        });
      } else {
        return run("git", ["clone", repo, targetDir, '--branch', branch]);
      }
    });
  });
}

function replaceTree(targetDir, ourDir, commitMessage) {
  return fs.ensureDir(targetDir).then(function() {
    return run("git", ["rm", "--ignore-unmatch", "-r", "."], {cwd: targetDir});
  }).then(function(){
    return copy(ourDir, targetDir, {stopOnErr:true});
  }).then(function() {
    return run('git', ['add', '-A'], {cwd: targetDir});
  }).then(function() {
    return currentRevision();
  }).then(function(revision) {
    commitMessage = commitMessage.replace(/%@/g, revision);

    return run('git', ['commit', '-m', commitMessage], {cwd: targetDir}).catch(function(err){
      if (/nothing to commit/.test(err.stdout)) {
        return false;
      }
      throw err;
    });
  }).then(function() { return true; });
}

function push(targetDir, repo, branch) {
  return run('git', ['push', repo, branch], {cwd: targetDir});
}

function origin(targetDir) {
  return run("git", ["remote", "-v"], { cwd: targetDir }).then(function(output) {
    var m = /origin\s+(\S+)/.exec(output.stdout);
    if (m) { return m[1]; }
  });
}

exports.prepareTree = prepareTree;
exports.replaceTree = replaceTree;
exports.push = push;
exports.origin = origin;
